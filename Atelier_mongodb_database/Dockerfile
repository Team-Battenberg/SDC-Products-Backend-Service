FROM node:12.0
RUN mkdir /products_database
ADD . /products_database
WORKDIR /products_database
RUN npm install

EXPOSE 4234
CMD ["node", "index.js"]