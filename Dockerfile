FROM node:4

RUN mkdir /build
WORKDIR /build

COPY . /build
RUN npm install && npm run build

RUN mkdir -p /var/www/html && cp -r public/* /var/www/html/
VOLUME /var/www/html
