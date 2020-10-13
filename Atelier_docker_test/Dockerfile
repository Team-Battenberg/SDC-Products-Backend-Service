FROM node:12.0
RUN mkdir /products_service
ADD . /products_service
WORKDIR /products_service
RUN npm install

EXPOSE 4231
CMD ["node", "index.js"]