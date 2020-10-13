FROM node:12.0
RUN mkdir /products_database
ADD . /products_database
WORKDIR /products_database
RUN npm install

EXPOSE 4231
CMD ["node", "index.js"]