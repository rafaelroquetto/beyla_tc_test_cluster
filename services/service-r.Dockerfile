FROM node:18-alpine

WORKDIR /usr/src/app

RUN cat <<EOF > package.json
{
  "name": "service-r",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.2",
    "ioredis": "^5.3.2"
  }
}
EOF


RUN npm install

COPY service-r.js .

EXPOSE 5006

CMD ["node", "service-r.js"]

