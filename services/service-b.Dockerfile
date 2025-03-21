# Service B - Node.js
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy application code and install dependencies
COPY service-b.js /app/
RUN npm init -y && npm install express axios

# Expose the application port
EXPOSE 5001

# Command to start the service
CMD ["node", "service-b.js"]

