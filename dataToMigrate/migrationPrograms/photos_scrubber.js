const csvParse = require("csv-parse");
const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [ "photo_id","style_id","url","thumbnail_url" ]
});

let readStream = fs.createReadStream("../rawData/photos.csv");
let writeStream = fs.createWriteStream("../normalizedData/photos_normalized.csv");

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
    this.x = '47'
    this.memo = {}
  }
  _transform(chunk, encoding, next) {
    for (let i = 0; i < chunk.length; i++) {
      //trims whitespace
      let trimmedItem = chunk[i].trim();
      chunk[i] = trimmedItem;
    }
    if (this.memo[chunk[0]]) {
      next();
    } else {
      this.memo[chunk[0]] = true;
      //uses our csvStringifier to turn our chunk into a csv string
      chunk = csvStringifier.stringifyRecords([chunk]);
      this.push(chunk);
      next();
    }
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });


readStream
  .pipe(csvParse({
    skip_lines_with_error: true
  }))
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });