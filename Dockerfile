# install dependencies
FROM node:24-alpine AS deps

# # Install SSL certs
RUN apk update && \
    apk add --no-cache libc6-compat curl ca-certificates


WORKDIR /app
COPY package*.json ./
RUN npm install 


#  Build the app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]