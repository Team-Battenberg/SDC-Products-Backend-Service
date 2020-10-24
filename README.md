# SDC - Products Backend Service

### Scalable REST API to serve as interface between a database and a front-end applicaiton

*This project is a REST API designed to provide an interface between a database and a front-end web application.  It is configured to connect to a PostgreSQL database and provides several endpoints which can be used to access the data.  The project also utilizes redis for response caching which can increase response effciency under certain loading conditions.  The intention of this project is to maximize the effciency of a single instance of the service prior to implementing horizontal scaling driven by the web traffic to the front-endf application.*

-----------------------------------------------------------------------------------------------------------------------------

## Table of Contents
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
   
-----------------------------------------------------------------------------------------------------------------------------

## Install

If using docker an image of this project can be found at the link below:

[joed11/products-service](https://hub.docker.com/repository/docker/joed11/sdc-product-service)


Install dependencies:

   `npm install`

Set environment variables as necessary.  Expected environment variables:

   * **PORT** = The port the server will listen on
   * **PGPORT** = The port to access the PostgreSQL server
   * **PGHOST** = The address for the PostgreSQL server
   * **PGDATABASE** = The name of the database to connect to within PostgreSQL
   * **PGUSER** = The username to access the database
   * **PGPASSWORD** = The password to access the database
   * **CACHEHOST** = The address for the Redis cache

Run server with nodemon:

   `npm run start-dev`

Run server:

   `npm start`

Default port will be 4323 if PORT environment variable is not provided.

-----------------------------------------------------------------------------------------------------------------------------

## Tech Stack

   * Node
   * Express
   * Docker
   * PostgreSQL
   * Redis
   * statsD
   
-----------------------------------------------------------------------------------------------------------------------------
   
## Routes

-----------------------------------------------------------------------------------------------------------------------------

### Products 

#### Endpoint: `/products`

#### GET: 
This route returns a set of products in the response.   It uses server side pagination to send a specifc subset of the stored products to the user.  The user can provide optional query parameters to the route to specifify the number of results per page and whcih page to return.

**Query Parameters:**

**Count** = The number of entries per page (Default value: 5) <br>
**Page** = The page of the results to return (Default value: 1)

#### *Example:*  `/products?page=2&count=10` - will return the 11th - 20th entries from the database

If no query parameters are specified results 1 thru 5 will be returned

-----------------------------------------------------------------------------------------------------------------------------

### Product by id 

#### Endpoint: `/products/:product_id`

#### GET: 
This route will return the full details of a a single product.

**Query Parameters:**

**:product_id** = An integer representing the product id of the desired product

#### *Example:*  `/products/1456` - will return the product with a product id of 1456

-----------------------------------------------------------------------------------------------------------------------------

### Product Styles 

#### Endpoint: `/products/:product_id/styles`

#### GET: 
This route will return an array containing every style associated with the specific product id provided.

**Query Parameters:**

**:product_id** = An integer representing the product id of the desired product

#### *Example:*  `/products/1456/styles` - will return all styles associated with the product that has a product id of 1456

-----------------------------------------------------------------------------------------------------------------------------

### Related Products 

#### Endpoint: `/products/:product_id/related`

#### GET: 
This route will return an array containing the product ids of any product that is considered to be related to the product id specified in the product_id query parameter.

**Query Parameters:**

**:product_id** = An integer representing the product id of the desired product

#### *Example:*  `/products/1456/related` - will return the product id numbers that are consdidered to be related to the product with a product id of 1456

-----------------------------------------------------------------------------------------------------------------------------
