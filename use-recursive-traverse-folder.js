 /**
 * @description use recursive traverse of folder
 * @author MingWei Gong
 */

const fs = require('fs');
const path = require('path');
const files = [];
 
const findDirectory = function (dir) {
  const fdList = fs.readdirSync(dir);
  fdList.forEach(fd => {
    const fdPath = path.resolve(dir, fd);
    const stat = fs.statSync(fdPath);
    if (stat.isFile()) {
      files.push(fdPath)
    } else if (stat.isDirectory()) {
      findDirectory(fdPath);
    }
  });
};
 
const filesDisplay = function (filePath) {
  const fdPath = path.resolve(filePath);
  const stat = fs.statSync(fdPath);
  if (stat.isDirectory()) {
    findDirectory(fdPath);
  } else if (stat.isFile()) {
    files.push(fdPath)
  }
  return files
};
 
console.log(filesDisplay('/Users/fengshi/Documents/tix/test'))