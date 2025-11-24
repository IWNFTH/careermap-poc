# backend/app/graphql/mutations/update_job.rb
module Mutations
  class UpdateJob < BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: true
    argument :company, String, required: true
    argument :location, String, required: true
    argument :url, String, required: false
    argument :description, String, required: false

    field :job, Types::JobType, null: true
    field :errors, [String], null: false

    def resolve(id:, title:, company:, location:, url: nil, description: nil)
      job = Job.find_by(id:)
      return { job: nil, errors: ['Job not found'] } unless job

      if job.update(title:, company:, location:, url:, description:)
        { job:, errors: [] }
      else
        { job: nil, errors: job.errors.full_messages }
      end
    end
  end
end
