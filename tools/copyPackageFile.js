if (process.argv.length < 3) {
  console.log('directory not provided');
  process.exit();
}

const fs = require('fs');
const util = require('util');
const path = require('path');

const copyFile = util.promisify(fs.copyFile);
const fileName = 'package.json';

const folders = process.argv.slice(2);

async function copy(folder) {
  const from = path.join(__dirname, '../src', folder, fileName);
  const to = path.join(__dirname, '../dist', folder, fileName);

  await copyFile(from, to);
}

Promise.all(folders.map(copy)).catch(err => (console.error(err), process.exit(1)));
