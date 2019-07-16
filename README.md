# prettier-check

[![Build Status](https://www.travis-ci.org/neo-fe/prettier-files.svg?branch=master)](https://www.travis-ci.org/neo-fe/prettier-files)

cli for quick checking and formatting prettier 🏃🏼 🏃🏼 🏃🏼

## require

Please install `prettier` >= version 1.15.3

```json
"peerDependencies": {
   "prettier": ">=1.15.3"
},
```

## install

```bash
npm install --save-dev prettier prettier-files
```

## Usage

### (1) adds prettierFiles attribute in package.json

`package.json` adds prettierFiles attribute

```json
...
 "prettierFiles":[
    "src/**/*.js*",
    "src/**/*.ts*",
    "src/**/*.less",
    "config/**/*.js*",
    "scripts/**/*.js"
  ],
...
```

### (2) api

```bash
Usage: prettier-files [options] [command]

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:
  check|-c       prettier check
  write|-w       prettier write
```

#### check

prettier will be get **prettierFiles** attribute in `package.json` by default 

```bash
prettier-files check
```

you can use an array of strings through the third parameter for easy use in combination with pre-commit Hook

```bash
prettierFiles check ['path1', 'path2']
```


#### wrtie

prettier will be get **prettierFiles** attribute in `package.json` by default 

```bash
prettier-files write
```

you can use an array of strings through the third parameter for easy use with pre-commit Hook

```bash
prettierFiles write ['path1', 'path2']
```

### (3) Matching rules

based on `glob`. Refer to matching rules.：

[Glob Primer](https://github.com/isaacs/node-glob#readme)

## pre-commit hook

Usually prettier is used with pre-commit Hook, The following examples use with husky and lint-stage

(1) install husky、lint-staged

```bash
npm install husky lint-staged --save --dev
```

(2) configure package.json

```json
"lint-staged": "lint-staged"
...
"lint-staged": {
  "**/*.{js,ts,tsx,json,jsx,less}": [
    "prettier-files check",
    "git add"
  ],
  "**/*.{js,jsx}": "npm run lint-staged:js"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
```

## License

MIT  license

MIT
