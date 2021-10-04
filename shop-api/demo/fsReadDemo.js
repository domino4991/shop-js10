const fs = require('fs');

const fileName = './test.json';

fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err);
  }

  const obj = JSON.parse(data);

  console.log('File contents:', obj.message);
});