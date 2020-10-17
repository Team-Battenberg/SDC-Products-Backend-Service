const { Sequelize, DataTypes } = require('sequelize');
const DATABASEHOST = '127.0.0.1'
const DB = new Sequelize('SDC-test', null, null, {
  host: DATABASEHOST,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  schema: 'products-database-v3'
});

DB.authenticate()
  .then(function() {
      console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
      console.log('Unable to connect to the database:', err);
});


const Product = DB.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(75),
    allowNull: false
  },
  slogan: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  default_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Style = DB.define('product_styles', {
  style_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(75),
    allowNull: false
  },
  sale_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  original_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  default_style: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Sku = DB.define('skus', {
  sku_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  style_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Feature = DB.define('features', {
  feature_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  feature: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  value: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
});

const Related = DB.define('related_products', {
  relation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id_1: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Photo = DB.define('product_photos', {
  photo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  style_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnail_url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Product.hasMany(Style, { foreignKey: 'product_id' });
Style.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Feature, { foreignKey: 'product_id' });
Feature.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Related, { foreignKey: 'product_id' });
Related.belongsTo(Product, { foreignKey: 'product_id' });

Style.hasMany(Photo, { foreignKey: 'style_id' });
Photo.belongsTo(Style, { foreignKey: 'style_id' });

Style.hasMany(Sku, { foreignKey: 'style_id' });
Sku.belongsTo(Style, { foreignKey: 'style_id' });


exports.Product = Product;
exports.Style = Style;
exports.Feature = Feature;
exports.Related = Related;
exports.Sku = Sku;
exports.Photo = Photo;