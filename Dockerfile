FROM node:12 AS node

COPY ./docs /app/docs
COPY ./website /app/website

WORKDIR /app/website

RUN npm install
RUN npm run build

FROM nginx:latest AS nginx
COPY --from=node /app/website/build/gomint /usr/share/nginx/html
