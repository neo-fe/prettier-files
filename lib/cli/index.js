const program = require('commander');
const { check, write } = require('../core/prettier-files');
const pkg = require('../../package.json');

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', function () {
    process.exit(1);
  });
}

const restArg = process.argv.slice(3);

program
    .version(pkg.version, '-v, --version')
    .description('run setup commands for all envs');

program
    .command('check')
    .description('prettier check')
    .action(function () {
      check(restArg);
    });

program
    .command('write')
    .description('prettier write')
    .action(function () {
      write(restArg);
    });

program.parse(process.argv);

if(program.args.length === 0) {
  program.help();
}
