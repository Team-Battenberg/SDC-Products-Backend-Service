-- DROP DATABASE IF EXISTS "SDC-products-database"
--     WITH
--     OWNER = joedimartino;

-- CREATE SCHEMA public
--     AUTHORIZATION postgres;


-- CREATE DATABASE "SDC-products-database"
--     WITH
--     OWNER = joedimartino
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8'
--     TABLESPACE = pg_default

--     CONNECTION LIMIT = -1;

-- CREATE SCHEMA "products-database-v2"
--     AUTHORIZATION joedimartino;

-- COMMENT ON SCHEMA "products-database-v2"
--     IS 'Product Micro-service Database';

-- GRANT ALL ON SCHEMA "products-database-v2" TO PUBLIC;

-- GRANT ALL ON SCHEMA "products-database-v2" TO joedimartino;


--SCHEMA: products-database-v1;


DROP TABLE IF EXISTS "product_photos";
DROP TABLE IF EXISTS "features";
DROP TABLE IF EXISTS "related_products";
DROP TABLE IF EXISTS "skus";
DROP TABLE IF EXISTS "product_styles";
DROP TABLE IF EXISTS "products";

-- ************************************** "products"

CREATE TABLE "products"
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

CREATE TABLE "related_products"
(
 "relation_id"  integer UNIQUE NOT NULL,
 "product_id"   integer NOT NULL,
 "product_id_1" integer NOT NULL,
 CONSTRAINT "PK_related_products" PRIMARY KEY ( "relation_id" ),
 CONSTRAINT "FK_132" FOREIGN KEY ( "product_id_1" ) REFERENCES "products" ( "product_id" ),
 CONSTRAINT "FK_89" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_132" ON "related_products"
(
 "product_id_1"
);

CREATE INDEX "fkIdx_89" ON "related_products"
(
 "product_id"
);

-- ************************************** "product_styles"

CREATE TABLE "product_styles"
(
 "style_id"       integer UNIQUE NOT NULL,
 "product_id"     integer NOT NULL,
 "name"           CHARACTER VARYING(75) NOT NULL,
 "sale_price"     integer NOT NULL,
 "original_price" integer NOT NULL,
 "default_style"  integer NOT NULL,
 CONSTRAINT "PK_product_styles" PRIMARY KEY ( "style_id" ),
 CONSTRAINT "FK_47" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_47" ON "product_styles"
(
 "product_id"
);

-- ************************************** "features"

CREATE TABLE "features"
(
 "feature_id" integer UNIQUE NOT NULL,
 "product_id" integer NOT NULL,
 "feature"    CHARACTER VARYING(50) NOT NULL,
 "value"      CHARACTER VARYING(50) NULL,
 CONSTRAINT "PK_features" PRIMARY KEY ( "feature_id" ),
 CONSTRAINT "FK_121" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_121" ON "features"
(
 "product_id"
);

-- ************************************** "skus"

CREATE TABLE "skus"
(
 "sku_id"   integer UNIQUE NOT NULL,
 "style_id" integer NOT NULL,
 "size"     CHARACTER VARYING(10) NOT NULL,
 "quantity" integer NOT NULL,
 CONSTRAINT "PK_skus" PRIMARY KEY ( "sku_id" ),
 CONSTRAINT "FK_109" FOREIGN KEY ( "style_id" ) REFERENCES "product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_109" ON "skus"
(
 "style_id"
);

-- ************************************** "product_photos"

CREATE TABLE "product_photos"
(
 "photo_id"      integer UNIQUE NOT NULL,
 "style_id"      integer NOT NULL,
 "url"           text NOT NULL,
 "thumbnail_url" text NOT NULL,
 CONSTRAINT "PK_product_photos" PRIMARY KEY ( "photo_id" ),
 CONSTRAINT "FK_124" FOREIGN KEY ( "style_id" ) REFERENCES "product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_124" ON "product_photos"
(
 "style_id"
);