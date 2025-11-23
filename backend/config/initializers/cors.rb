# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3100', 'http://127.0.0.1:3100'

    resource '/graphql',
             headers: :any,
             methods: [:post, :options]
  end
end
