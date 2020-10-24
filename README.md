# SDC - Products Backend Service

### Scalable REST API to serve as interface between a database and a front-end applicaiton

*This project is a REST API designed to provide an interface between a database and a front-end web application.  It is configured to connect to a PostgreSQL database and provides several endpoints which can be used to access the data.  The project also utilizes redis for response caching which can increase response effciency under certain loading conditions.  The intention of this project is to maximize the effciency of a single instance of the service prior to implementing horizontal scaling driven by the web traffic to the front-endf application.*

### Table of Contents
#### 1. Install
#### 2. Tech Stack
#### 3. Routes
   1. Products
   1. Products By Id
   1. Styles
   1. Related
#### 4. Performance
   1. Basic Route Performance
   1. Abnormal Traffic Handling with Redis
   

## Install

If using docker an image of this project can be found at the link below:

[joed11/products-service](https://hub.docker.com/repository/docker/joed11/sdc-product-service)


Install dependencies:

   `npm install`

Set environment variables as necessary.  Expected environment variables:

   * PORT = The port the server will listen on
   * PGPORT = The port to access the PostgreSQL server
   * PGHOST = The address for the PostgreSQL server
   * PGDATABASE = The name of the database to connect to within PostgreSQL
   * PGUSER = The username to access the database
   * PGPASSWORD = The password to access the database
   * CACHEHOST = The address for the Redis cache

Run server with nodemon:

   `npm run start-dev`

Run server:

   `npm start`

Default port will be 4323 if PORT environment variable is not provided.

