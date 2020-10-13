-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;


-- ************************************** "products"

CREATE TABLE "products"
(
 "product_id"    integer NOT NULL,
 "name"          string NOT NULL,
 "slogan"        sting NOT NULL,
 "description"   text NOT NULL,
 "category"      string NOT NULL,
 "default_price" string NOT NULL,
 CONSTRAINT "PK_products" PRIMARY KEY ( "product_id" )
);








-- ************************************** "related_products"

CREATE TABLE "related_products"
(
 "product_id"         integer NOT NULL,
 "related_product_id"  integer NOT NULL,
 CONSTRAINT "PK_related_products" PRIMARY KEY ( "product_id" ),
 CONSTRAINT "FK_89" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_89" ON "related_products"
(
 "product_id"
);








-- ************************************** "product_styles"

CREATE TABLE "product_styles"
(
 "style_id"       integer NOT NULL,
 "name"           string NOT NULL,
 "original_price" string NOT NULL,
 "sale_price"     integer NOT NULL,
 "product_id"     integer NOT NULL,
 CONSTRAINT "PK_product_styles" PRIMARY KEY ( "style_id" ),
 CONSTRAINT "FK_47" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_47" ON "product_styles"
(
 "product_id"
);








-- ************************************** "skus"

CREATE TABLE "skus"
(
 "quantity" integer NOT NULL,
 "sku_id"   integer NOT NULL,
 "size"     string NOT NULL,
 "style_id" integer NOT NULL,
 CONSTRAINT "PK_skus" PRIMARY KEY ( "sku_id" ),
 CONSTRAINT "FK_83" FOREIGN KEY ( "style_id" ) REFERENCES "product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_83" ON "skus"
(
 "style_id"
);








-- ************************************** "product_photos"

CREATE TABLE "product_photos"
(
 "prod_photo_id" integer NOT NULL,
 "thumbnail_url" string NOT NULL,
 "url" string NOT NULL,
 "style_id" integer NOT NULL,
 CONSTRAINT "PK_product_photos" PRIMARY KEY ( "prod_photo_id" ),
 CONSTRAINT "FK_50" FOREIGN KEY ( "style_id" ) REFERENCES "product_styles" ( "style_id" )
);

CREATE INDEX "fkIdx_50" ON "product_photos"
(
 "style_id"
);







