const express = require('express');
const chalk = require('chalk');
const app = express();

const port = 3001;

app.use(express.static('../client'));

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
})