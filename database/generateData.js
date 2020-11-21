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

// let generateOneRecord = function (recordCount = 100, maxRelatives = 10, cb) {
//   for (var i = 1; i <= recordCount; i++) {
//     let relationshipCount = Math.ceil(Math.random() * maxRelatives);
//     const record = emptyRecord(i);

//     while (relationshipCount > 0) {
//       let relative = Math.ceil(Math.random() * recordCount);
//       if (!record['related'].includes(relative) && relative !== i) {
//         record['related'].push(relative);
//         relationshipCount--
//       }
//     }
//     cb(record)
//   }
// }

let generateManyRecords = function (recordCount = 100, maxRelatives = 10) {
  let records = [];
  for (var i = 1; i <= recordCount; i++) {
    let relationshipCount = Math.ceil(Math.random() * maxRelatives);
    const record = emptyRecord(i);

    while (relationshipCount > 0) {
      let relative = Math.ceil(Math.random() * recordCount);
      if (!record['related'].includes(relative) && relative !== i) {
        record['related'].push(relative);
        relationshipCount--
      }
    }
    records.push(record);
  }
  return records
}

// let generateReciprocalRecords = function (recordCount = 100, maxRelatives = 10, cb) {
//   let records = {};

//   for (var i = 1; i <= recordCount; i++) {
//     let relationshipCount = Math.ceil(Math.random() * maxRelatives);
//     if (records[i] === undefined) {
//       records[i] = emptyRecord(i);
//     }
//     relationshipCount = relationshipCount - records[i]['related'].length;
//     while (relationshipCount > 0) {
//       let relative = Math.ceil(Math.random() * recordCount);
//       if (!records[i]['related'].includes(relative) && relative !== i) {
//         records[i]['related'].push(relative);

//         if (records[relative] === undefined) {
//           records[relative] = emptyRecord(relative);
//         }
//         if (!records[relative]['related'].includes(i)) {
//           records[relative]['related'].push(i);
//         }

//         relationshipCount--
//       }
//     }
//   }
//   cb(records)
// }

module.exports = { emptyRecord, generateManyRecords }