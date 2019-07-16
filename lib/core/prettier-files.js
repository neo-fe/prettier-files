'use strict';

const prettier = require('prettier');
const fs = require('fs');
const getPrettierFiles = require('./getAllFiles');
const resolveCwd = require('./resolveCwd');
const chalk = require('chalk');

let didError = false;
let didWarn = false;

const prettierConfigPath = require.resolve(resolveCwd('.prettierrc'));

const format = (file, fileInfo, options) => {
  const input = fs.readFileSync(file, 'utf8');
  const withParserOptions = {
    ...options,
    parser: fileInfo.inferredParser,
  };
  const output = prettier.format(input, withParserOptions);
  if (output !== input) {
    fs.writeFileSync(file, output, 'utf8');
    console.log(chalk.green(`${file} is prettier`));
  }
};

const run = (type, restArg) => {
  const prettierFiles = restArg.length > 0 ? restArg : getPrettierFiles();
  prettierFiles.forEach(file => {
    Promise.all([
      prettier.resolveConfig(file, {
        config: prettierConfigPath,
      }),
      prettier.getFileInfo(file),
    ]).then(resolves => {
      const [options, fileInfo] = resolves;
      if (fileInfo.ignored) {
        return;
      }
      const input = fs.readFileSync(file, 'utf8');
      const withParserOptions = {
        ...options,
        parser: fileInfo.inferredParser,
      };

      if(type === 'check') {
        const isPrettier = prettier.check(input, withParserOptions);
        if (!isPrettier) {
          console.log(chalk.red(`${file} is no prettier, please use npm run prettier`));
          didWarn = true;
        }

      } else if(type === 'write') {
        format(file, fileInfo, withParserOptions);
        return;
      }
    }).catch(e => {
      didError = true;
      throw e;
    }).finally(() => {
      if (didWarn || didError) {
        process.exit(1);
      }
    });
  });
};

const write = (restArg) => {
  run('write', restArg);
};

const check = (restArg) => {
  run('check', restArg);
};

module.exports =  { check, write };

