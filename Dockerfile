FROM node:lts
FROM nginx:alpine

COPY ./docs /app/docs
COPY ./website /app/website

WORKDIR /app/website

CMD ["npm", "install"]
CMD ["npm", "run", "build"]

COPY ./build/gomint /usr/share/nginx/html
