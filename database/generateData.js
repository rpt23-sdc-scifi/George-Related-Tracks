const fs = require('fs');

let emptyRecord = function (id) {
  // generates a record from a template with 'song_id' id,
  // an empty array for the 'related' key,
  // and randomly generated values for the other keys
  let influencerStatus = Math.random();
  let newRecord = {
    song_id: id,
    plays: Math.ceil(Math.random() * 100),
    likes: Math.ceil(Math.random() * 10),
    reposts: Math.ceil(Math.random() * 10),
    related: []
  };

  if (influencerStatus > 0.5) {
    newRecord.plays += Math.ceil(Math.random() * 1000)
    newRecord.likes += Math.ceil(Math.random() * 100)
    newRecord.reposts += Math.ceil(Math.random() * 50)
  }

  if (influencerStatus > 0.8) {
    newRecord.plays += Math.ceil(Math.random() * 100000)
    newRecord.likes += Math.ceil(Math.random() * 10000)
    newRecord.reposts += Math.ceil(Math.random() * 1000)
  }

  if (influencerStatus > 0.95) {
    newRecord.plays += Math.ceil(Math.random() * 1000000)
    newRecord.likes += Math.ceil(Math.random() * 500000)
    newRecord.reposts += Math.ceil(Math.random() * 50000)
  }

  return newRecord
}

// let writeManyJSONRecords = function (recordCount = 100, maxRelatives = 10, grandTotal = recordCount, batchCount = 0) {
//   return new Promise((resolve) => {
//     var records = [];
//     let start = recordCount * batchCount;
//     for (var i = 1; i <= recordCount; i++) {
//       let relationshipCount = Math.ceil(Math.random() * maxRelatives);
//       const record = emptyRecord(start + i);

//       while (relationshipCount > 0) {
//         let relative = Math.ceil(Math.random() * grandTotal);
//         if (!record['related'].includes(relative) && relative !== (start + i)) {
//           record['related'].push(relative);
//           relationshipCount--
//         }
//       }
//       records.push(record);
//     }
//     resolve()
//   })
// }

let generateRecordPromise = function (id, maxRelatives = 10, grandTotal = 100) {
  return new Promise((resolve) => {
    let relationshipCount = Math.ceil(Math.random() * maxRelatives);
    const record = emptyRecord(id);

    while (relationshipCount > 0) {
      let relative = Math.ceil(Math.random() * grandTotal);
      if (!record['related'].includes(relative) && relative !== id) {
        record['related'].push(relative);
        relationshipCount--
      }
    }
    resolve(record)
  })
}

let generateManyRecordPromises = function (recordCount = 100, maxRelatives = 10, grandTotal = recordCount, batchCount = 0) {
  return new Promise((resolve) => {
    let records = [];
    for (var i = 1 + (batchCount * recordCount); i <= recordCount + (batchCount * recordCount); i++) {
      let relationshipCount = Math.ceil(Math.random() * maxRelatives);
      const record = emptyRecord(i);

      while (relationshipCount > 0) {
        let relative = Math.ceil(Math.random() * grandTotal);
        if (!record['related'].includes(relative) && relative !== i) {
          record['related'].push(relative);
          relationshipCount--
        }
      }
      records.push(record);
    }
    resolve(records)
  })
}

module.exports = { emptyRecord, generateRecordPromise, generateManyRecordPromises }