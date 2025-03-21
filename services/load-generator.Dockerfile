FROM python:3.9-slim

# Copy load generator script
COPY load-generator.py /app/load-generator.py
WORKDIR /app

# Install dependencies (if any, e.g., requests library)
RUN pip install requests

# Command to run the script
CMD ["python", "load-generator.py"]

