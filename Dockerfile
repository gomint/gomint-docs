FROM node:12 AS node

COPY ./ /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx:latest AS nginx
COPY --from=node /app/build /usr/share/nginx/html
