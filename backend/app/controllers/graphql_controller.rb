# frozen_string_literal: true

class GraphqlController < ApplicationController
  # SPA や外部クライアントからの POST を許可するために CSRF を無効化
  skip_before_action :verify_authenticity_token

  # GraphQL 実行前に JWT から current_user をセット
  before_action :authenticate_user_from_jwt

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      # resolver から context[:current_user] で参照できる
      current_user: @current_user,
    }
    result = BackendSchema.execute(
      query,
      variables: variables,
      context: context,
      operation_name: operation_name,
    )
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  # Authorization: Bearer <jwt> から current_user をセット
  def authenticate_user_from_jwt
    auth_header = request.headers['Authorization']
    return unless auth_header&.start_with?('Bearer ')

    token = auth_header.split(' ').last
    secret = Rails.application.credentials.jwt_secret_key || 'dev-secret-key-change-me'

    begin
      payload, = JWT.decode(token, secret, true, algorithm: 'HS256')
      @current_user = User.find_by(id: payload['sub'])
    rescue JWT::DecodeError, JWT::ExpiredSignature
      @current_user = nil
    end
  end

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      # GraphQL-Ruby will validate name and type of incoming variables.
      variables_param.to_unsafe_hash
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end
end
