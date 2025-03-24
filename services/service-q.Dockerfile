FROM node:18-alpine

WORKDIR /app

# Install dependencies
RUN npm init -y && npm install express express-graphql graphql

COPY service-q.js .

EXPOSE 5007

CMD ["node", "service-q.js"]

