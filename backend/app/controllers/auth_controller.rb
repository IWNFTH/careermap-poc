class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = generate_jwt(user)

      render json: {
        status: "ok",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token: token
      }
    else
      render json: { status: "error", message: "Invalid credentials" }, status: :unauthorized
    end
  end

  private

  def generate_jwt(user)
    payload = {
      sub: user.id,
      exp: 24.hours.from_now.to_i
    }

    secret = Rails.application.credentials.jwt_secret_key || "dev-secret-key-change-me"

    JWT.encode(payload, secret, "HS256")
  end
end
