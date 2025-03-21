# Use an official GCC image as the base
FROM gcc:11 as builder

# Set working directory
WORKDIR /app

# Copy the source code
COPY service-e.cpp /app/service-e.cpp

# Compile the C++ code
RUN g++ -std=c++20 -o service-e service-e.cpp -lpthread

# Use a lightweight runtime image
FROM debian:bullseye-slim

# Copy the compiled binary
COPY --from=builder /app/service-e /app/service-e

# Expose the application port
EXPOSE 5004

# Command to start the service
CMD ["/app/service-e"]

