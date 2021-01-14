const chalk = require('chalk');
const fs = require('fs');
const { dirname } = require('path');
const generateData = require('./generateData.js')

async function seedJSON(totalRecords) {
  let writers = [];
  for (var i = 0; i < 10; i++) {
    writers[i] = fs.createWriteStream(`${__dirname}/data/records${i}.json`);
  }

  let writer = writers[0];
  for (let i = 1; i <= totalRecords; i++) {

    if (i % 1000000 === 1) {
      writer = writers[Math.floor(i % 1000000)]
    }

    if (!writer.write('')) {
      await new Promise((resolve) => writer.once('drain', resolve));
    }

    if (i % 100000 === 0) {
      console.log(chalk.bgGreen(`JSON Seeding ${i / 100000}% Complete`));
    };

    try {
      const record = await generateData.generateRecordPromise(i, 10, totalRecords);
      let strings = JSON.stringify(record)
      if (i % 1000000 === 1) {
        strings = '[' + strings
      } else if (i % 1000000 === 0) {
        console.log('end stream');
        strings = ',' + strings + ']'
      } else {
        strings = ',' + strings
      }
      writer.write(strings)
    } catch (err) {
      throw err;
    }
  }
};

async function seed() {
  let totalRecords = 10000000

  seedJSON(totalRecords)
    .then(() => {
      console.log('succesfully seeded json')
    })
    .catch((err) => {
      throw err;
    })
}

seed();