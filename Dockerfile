FROM node:14
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY app.js .
EXPOSE 8080

CMD [ "node", "/path/app.js" ]
