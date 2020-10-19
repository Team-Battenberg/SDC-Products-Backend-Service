const { Client } = require('pg')
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
client.connect()
  .then(() => console.log(`Connected to pg on port ${process.env.PGPORT}`))
  .catch(err => console.error('connection error', err.stack))
module.exports.client = client


/*products query
SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" ORDER BY "products"."product_id" LIMIT 5 OFFSET 0;
*/


/*product by id query
//product
SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" WHERE "products"."product_id" = '54343';
//features
SELECT "feature", "value" FROM "products-database-v3"."features" AS "features" WHERE "features"."product_id" = '54343';
*/



/*style query
//styles
SELECT "style_id", "name", "sale_price", "original_price", "default_style" FROM "products-database-v3"."product_styles" AS "product_styles" WHERE "product_styles"."product_id" = '11';
//photos
SELECT "url", "thumbnail_url" FROM "products-database-v3"."product_photos" AS "product_photos" WHERE "product_photos"."style_id" = 53;
//skus
SELECT "sku_id", "size", "quantity" FROM "products-database-v3"."skus" AS "skus" WHERE "skus"."style_id" = 53;
*/



/* related query
SELECT "product_id_1" FROM "products-database-v3"."related_products" AS "related_products" WHERE "related_products"."product_id" = '1';
*/

