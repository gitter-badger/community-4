FROM node:4

RUN mkdir /build
WORKDIR /build

COPY . /build
RUN npm install

RUN mkdir -p /var/www/html
VOLUME /var/www/html

COPY build.sh /build
RUN chmod +x build.sh
CMD ["./build.sh"]
