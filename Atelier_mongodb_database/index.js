const EXPRESS = require('express');
const app = EXPRESS();
const bodyParser = require('body-parser');
const PORT = 4324;

app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send('you found the mongoose db server')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})





const job = require('company');

if (good(job)) {
  return money;
}