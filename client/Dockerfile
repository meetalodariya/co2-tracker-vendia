FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .

ARG API_HOST
ENV API_HOST $API_HOST

RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
