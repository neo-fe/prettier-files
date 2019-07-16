'use strict';

const glob = require('glob');
const fs = require('fs');
const resolveCwd = require('./resolveCwd');
const packageJsonPath = require.resolve(resolveCwd('package.json'));


function getPrettierFilesList() {
  try {
    const fr = fs.readFileSync(packageJsonPath,{encoding:"utf-8"});
    const prettierFilesList = JSON.parse(fr).prettierFiles;
    return prettierFilesList;
  } catch (err) {
    console.log('Error', err);
  }
}

const getPrettierFiles = () => {
  const prettierFilesList = getPrettierFilesList();
  const files = [];
  for(let i = 0; i < prettierFilesList.length; i++) {
      const globFiles = glob.sync(prettierFilesList[i]);
      files.push(...globFiles);
  }
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
