const express = require('express');
const path = require('path');
const chalk = require('chalk');
const app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Hi');
})

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})