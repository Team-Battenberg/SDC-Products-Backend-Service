const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "style_id", title: "style_id" },
    { id: "product_id", title: "product_id" },
    { id: "name", title: "name" },
    { id: "sale_price", title: "sale_price" },
    { id: "original_price", title: "original_price" },
    { id: "default_style", title: "default_style" },
  ],
});

let readStream = fs.createReadStream("../rawData/styles.csv");
let writeStream = fs.createWriteStream("../normalizedData/styles_normalized.csv");

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
    this.x = 0
  }
  _transform(chunk, encoding, next) {
    this.x += 1;
    if (this.x < 5) {
      console.log('before chunk:',chunk)
    }
    for (let key in chunk) {
      //trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    //filters out all non-number characters
    let onlyNumbersOrginalPrice = chunk.original_price.replace(/\D/g, "");
    chunk.original_price = onlyNumbersOrginalPrice;
    let onlyNumbersDefaultStyle = chunk.default_style.replace(/\D/g, "");
    chunk.default_style = onlyNumbersDefaultStyle;
    if (chunk.sale_price !== 'null') {
      let onlyNumbersSalePrice = chunk.sale_price.replace(/\D/g, "");
      chunk.sale_price = onlyNumbersSalePrice;
    } else{
      chunk.sale_price = 0;
    }
    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    if (this.x < 5) {
      console.log('after chunk:',chunk)
    }
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });