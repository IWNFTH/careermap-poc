module Mutations
  class CreateJob < BaseMutation
    argument :title, String, required: true
    argument :company, String, required: true
    argument :location, String, required: true
    argument :url, String, required: false
    argument :description, String, required: false

    field :job, Types::JobType, null: true
    field :errors, [String], null: false

    def resolve(title:, company:, location:, url: nil, description: nil)
      job = Job.new(title:, company:, location:, url:, description:)

      if job.save
        { job: job, errors: [] }
      else
        { job: nil, errors: job.errors.full_messages }
      end
    end
  end
end
