# SDC - Products Backend Service

### Scalable REST API to serve as interface between a database and a front-end applicaiton

*This project is a REST API designed to provide an interface between a database and a front-end web application.  It is configured to connect to a PostgreSQL database and provides several endpoints which can be used to access the data.  The project also utilizes redis for response caching which can increase response effciency under certain loading conditions.  The intention of this project is to maximize the effciency of a single instance of the service prior to implementing horizontal scaling driven by the web traffic to the front-endf application.*

#### Table of Contents
1. Install
1. Tech Stack
1. Routes
   1. Products
   1. Products By Id
   1. Styles
   1. Related
1. Performance
   1. Basic Route Performance
   1. Abnormal Traffic Handling with Redis
   

### Install
