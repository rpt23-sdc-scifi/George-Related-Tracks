const chalk = require('chalk');
const fs = require('fs');
const { dirname } = require('path');
const generateData = require('./generateData.js')

async function seedJSON(totalRecords) {
  let writer1 = fs.createWriteStream(`${__dirname}/data/records1.json`);
  let writer2 = fs.createWriteStream(`${__dirname}/data/records2.json`);
  let writer3 = fs.createWriteStream(`${__dirname}/data/records3.json`);
  let writer = writer1;
  for (let i = 1; i <= totalRecords; i++) {
    if (i >= 4000001 && i < 8000001) {
      writer = writer2
    }
    if (i >= 8000001) {
      writer = writer3
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
      if (i === 1 || i === 4000001 || i === 8000001) {
        strings = '[' + strings
      } else if (i === 4000000 || i === 8000000 || i === 10000000) {
        console.log('end stream');
        strings = ',' + strings + ']'
      } else {
        strings = ',' + strings
      }
      writer.write(strings)
    } catch (err) {
      throw err;
    }
    // await generateData.generateRecordPromise(i, 10, totalRecords)
    //   .then((record) => {
    //     let strings = JSON.stringify(record)
    //     if (i === 1 || i === 4000001 || i === 8000001) {
    //       strings = '[' + strings
    //     } else if (i === 4000000 || i === 8000000 || i === 10000000) {
    //       console.log('end stream');
    //       strings = ',' + strings + ']'
    //     } else {
    //       strings = ',' + strings
    //     }
    //     writer.write(strings)
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
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