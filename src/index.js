require('dotenv/config');

const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}...`);
});
