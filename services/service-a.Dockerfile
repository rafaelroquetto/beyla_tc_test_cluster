# Service A - Python
FROM python:3.9-slim

# Install dependencies
RUN pip install flask requests

# Copy application code
COPY service-a.py /app/service-a.py
WORKDIR /app

# Expose the application port
EXPOSE 5000

# Command to start the service
CMD ["python", "service-a.py"]

