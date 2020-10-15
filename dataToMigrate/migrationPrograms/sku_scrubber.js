const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "sku_id", title: "sku_id" },
    { id: "style_id", title: "style_id" },
    { id: "size", title: "size" },
    { id: "quantity", title: "quantity" },
  ],
});

let readStream = fs.createReadStream("../rawData/skus.csv");
let writeStream = fs.createWriteStream("../normalizedData/skus_normalized.csv");

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
    let onlyNumbers = chunk.quantity.replace(/\D/g, "");
    chunk.quantity = onlyNumbers;

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