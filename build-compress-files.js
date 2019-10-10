/**
 * @description Compress files using the archiver package
 * @author MingWei Gong
 */

'use strict';
const fs = require('fs');
const assert = require('assert');
const path = require('path');

// The third party NPM
const archiver = require('archiver');

const buildCompressFiles = async (sources, target, fileName) => {
  assert.ok(sources, 'sources is required for archiver');
  assert.ok(target, 'target is required for archiver');
  assert.ok(fileName, 'fileName is required for archiver');

  // Ensure sources
  if (!path.isAbsolute(sources)) throw new Error(`sources ${sources} must be a absolute path`);
  if (!fs.existsSync(sources)) throw new Error(`sources ${sources} does not exist`);
  try {
    fs.accessSync(sources, fs.constants.R_OK);
  } catch (err) {
    throw new Error(`You do not have permission to read ${sources}`);
  }

  // Ensure target
  if (!path.isAbsolute(target)) throw new Error(`target ${target} must be a absolute path`);
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

  // Ensure zip file
  const zipFile = path.resolve(target, `${fileName}.zip`);
  if (fs.existsSync(zipFile) && fs.statSync(zipFile).isFile()) fs.unlinkSync(zipFile);

  // Archive
  return new Promise((resolve, reject) => {
    let writeStream, archiveStream;
    try {
      writeStream = fs.createWriteStream(zipFile);
      archiveStream = archiver('zip', { zlib: { level: 9 } });
    } catch (err) {
      reject(err);
    }

    writeStream.on('close', function () {
      resolve(zipFile);
    });

    archiveStream.on('error', function (err) {
      reject(err);
    });

    archiveStream.pipe(writeStream);
    archiveStream.directory(`${sources}`, false);
    archiveStream.finalize();
  });
};

module.exports = buildCompressFiles;
