const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'background.js');
const destPath = path.join(__dirname, 'build', 'background.js');

fs.copyFile(srcPath, destPath, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log('background.js copied successfully!');
  }
});
