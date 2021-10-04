const fs = require('fs');

const fileName = './test.txt';

fs.writeFileSync(fileName, 'Hello, world!');

console.log('File was saved!');

console.log('End of program');