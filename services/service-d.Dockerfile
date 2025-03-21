# Service D - Ruby
FROM ruby:3.0-alpine

# Install dependencies
RUN apk add --no-cache build-base

# Install Sinatra and required gems
RUN gem install sinatra rackup puma

# Set the working directory
WORKDIR /app

# Copy the Ruby application code
COPY service-d.rb /app/service-d.rb

# Create the config.ru file dynamically
RUN echo "require './service-d'" > /app/config.ru && \
    echo "run Sinatra::Application" >> /app/config.ru

# Expose the application port
EXPOSE 5003

# Command to start the service
CMD ["rackup", "--host", "0.0.0.0", "--port", "5003"]

