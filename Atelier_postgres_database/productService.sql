-- DROP DATABASE IF EXISTS "SDC-products"
--     WITH
--     OWNER = joedimartino;

-- CREATE DATABASE "SDC-products"
--     WITH
--     OWNER = joedimartino
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8'
--     TABLESPACE = pg_default

--     CONNECTION LIMIT = -1;

-- CREATE SCHEMA "products-database-v3"
--     AUTHORIZATION joedimartino;

-- COMMENT ON SCHEMA "products-database-v3"
--     IS 'Product Micro-service Database';

-- GRANT ALL ON SCHEMA "products-database-v3" TO PUBLIC;

-- GRANT ALL ON SCHEMA "products-database-v3" TO joedimartino;

--SCHEMA: products-database-v3;


DROP TABLE IF EXISTS "products-database-v3"."product_photos";
DROP TABLE IF EXISTS "products-database-v3"."features";
DROP TABLE IF EXISTS "products-database-v3"."related_products";
DROP TABLE IF EXISTS "products-database-v3"."skus";
DROP TABLE IF EXISTS "products-database-v3"."product_styles";
DROP TABLE IF EXISTS "products-database-v3"."products";

-- ************************************** "products"

CREATE TABLE "products-database-v3"."products"
(
 "product_id"    integer UNIQUE NOT NULL,
 "name"          CHARACTER VARYING(75) NOT NULL,
 "slogan"        CHARACTER VARYING(150) NOT NULL,
 "description"   text NOT NULL,
 "category"      CHARACTER VARYING(40) NOT NULL,
 "default_price" integer NOT NULL,
 CONSTRAINT "PK_products" PRIMARY KEY ( "product_id" )
);

-- ************************************** "related_products"

CREATE TABLE "products-database-v3"."related_products"
(
 "relation_id"  integer UNIQUE NOT NULL,
 "product_id"   integer NOT NULL,
 "product_id_1" integer NOT NULL,
 CONSTRAINT "PK_related_products" PRIMARY KEY ( "relation_id" ),
 CONSTRAINT "FK_132" FOREIGN KEY ( "product_id_1" ) REFERENCES "products-database-v3"."products" ( "product_id" ),
 CONSTRAINT "FK_89" FOREIGN KEY ( "product_id" ) REFERENCES "products-database-v3"."products" ( "product_id" )
);

CREATE INDEX "fkIdx_132" ON "products-database-v3"."related_products"
(
 "product_id_1"
);

CREATE INDEX "fkIdx_89" ON "products-database-v3"."related_products"
(
 "product_id"
);

-- ************************************** "product_styles"

CREATE TABLE "products-database-v3"."product_styles"
(
 "style_id"       integer UNIQUE NOT NULL,
 "product_id"     integer NOT NULL,
 "name"           CHARACTER VARYING(75) NOT NULL,
 "sale_price"     integer NOT NULL,
 "original_price" integer NOT NULL,
 "default_style"  integer NOT NULL,
 CONSTRAINT "PK_product_styles" PRIMARY KEY ( "style_id" ),
 CONSTRAINT "FK_47" FOREIGN KEY ( "product_id" ) REFERENCES "products-database-v3"."products" ( "product_id" )
);

CREATE INDEX "fkIdx_47" ON "products-database-v3"."product_styles"
(
 "product_id"
);

-- ************************************** "features"

CREATE TABLE "products-database-v3"."features"
(
 "feature_id" integer UNIQUE NOT NULL,
 "product_id" integer NOT NULL,
 "feature"    CHARACTER VARYING(50) NOT NULL,
 "value"      CHARACTER VARYING(50) NULL,
 CONSTRAINT "PK_features" PRIMARY KEY ( "feature_id" ),
 CONSTRAINT "FK_121" FOREIGN KEY ( "product_id" ) REFERENCES "products-database-v3"."products" ( "product_id" )
);

CREATE INDEX "fkIdx_121" ON "products-database-v3"."features"
(
 "product_id"
);

-- ************************************** "skus"

CREATE TABLE "products-database-v3"."skus"
(
 "sku_id"   integer UNIQUE NOT NULL,
 "style_id" integer NOT NULL,
 "size"     CHARACTER VARYING(10) NOT NULL,
 "quantity" integer NOT NULL,
 CONSTRAINT "PK_skus" PRIMARY KEY ( "sku_id" ),
 CONSTRAINT "FK_109" FOREIGN KEY ( "style_id" ) REFERENCES "products-database-v3"."product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_109" ON "products-database-v3"."skus"
(
 "style_id"
);

-- ************************************** "product_photos"

CREATE TABLE "products-database-v3"."product_photos"
(
 "photo_id"      integer UNIQUE NOT NULL,
 "style_id"      integer NOT NULL,
 "url"           text NOT NULL,
 "thumbnail_url" text NOT NULL,
 CONSTRAINT "PK_product_photos" PRIMARY KEY ( "photo_id" ),
 CONSTRAINT "FK_124" FOREIGN KEY ( "style_id" ) REFERENCES "products-database-v3"."product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_124" ON "products-database-v3"."product_photos"
(
 "style_id"
);