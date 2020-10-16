FROM node:12.0
RUN mkdir /products_service_server
ADD . /products_service_server
WORKDIR /products_service_server
RUN npm install

EXPOSE 4232
CMD ["node", "index.js"]