const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "relation_id", title: "relation_id" },
    { id: "product_id", title: "product_id" },
    { id: "product_id_1", title: "product_id_1" },
  ],
});

let readStream = fs.createReadStream("../rawData/related.csv");
let writeStream = fs.createWriteStream("../normalizedData/related_normalized.csv");

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

    //uses our csvStringifier to turn our chunk into a csv string
    if (chunk.product_id !== '0' && chunk.product_id_1 !== '0') {
      chunk = csvStringifier.stringifyRecords([chunk]);
      this.push(chunk);
      if (this.x < 5) {
        console.log('after chunk:',chunk)
      }
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