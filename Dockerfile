# install dependencies
FROM node:24-alpine AS deps

# # Install SSL certs
RUN apk update && \
    apk add --no-cache libc6-compat curl ca-certificates && \
    apk add bash


WORKDIR /app
COPY package*.json ./
RUN npm install 

COPY wait-for-it.sh ./  
RUN chmod +x wait-for-it.sh

#  Build the app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]