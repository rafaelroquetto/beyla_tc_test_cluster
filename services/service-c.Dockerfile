# Service C - Go
FROM golang:1.17-alpine

# Set up working directory and copy code
WORKDIR /app
COPY service-c.go .

# Build the Go application
RUN go build -o service-c service-c.go

# Expose the application port
EXPOSE 5002

# Command to start the service
CMD ["./service-c"]

