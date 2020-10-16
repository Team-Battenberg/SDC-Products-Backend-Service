const EXPRESS = require('express');
const app = EXPRESS();
const bodyParser = require('body-parser');
const PORT = 4321;

app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.status(200).send(`you're a docker Harry`)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})