#prettier-check

一款便于prettier快速检查、格式化的cli工具🏃🏼 🏃🏼 🏃🏼

## 依赖

项目中需安装`prettier`1.15.3及以上版本

```json
"peerDependencies": {
   "prettier": ">=1.15.3"
},
```

## 安装

```bash
npm install --save-dev prettier prettier-files
```

## 如何使用

### (1) 在package.json中添加prettierFiles属性

`package.json` 添加 prettierFiles 属性

```json
 "prettierFiles":[
    "src/**/*.js*",
    "src/**/*.ts*",
    "src/**/*.less",
    "mocker/**/*.js*"
  ],
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

默认情况下，prettier将在package.json中获取prettierfiles属性下的匹配规则

```bash
prettier-files check
```

也可以通过第三个参数传递一个字符串数组，便于结合pre-commit Hook使用

```bash
prettierFiles check ['path1', 'path2']
```



#### wrtie

默认会获取项目下package.json下**prettierFiles**下的相应匹配路径

```bash
prettier-files write
```

可以通过第三个参数传递一个字符串数组，便于结合pre-commit Hook使用

```bash
prettierFiles write ['path1', 'path2']
```

### (3) 匹配规则

匹配基于`glob`实现，匹配规则请参考：

[Glob Primer](https://github.com/isaacs/node-glob#readme)


## 结合pre-commit Hook

通常prettier会结合pre-commit的hook使用，以下例子使用了结合了husky以及lint-staged

(1) 安装husky、lint-staged

```bash
npm install husky lint-staged --save --dev
```

(2) 配置package.json

```json
"lint-staged": "lint-staged"
...
"lint-staged": {
  "**/*.{js,ts,tsx,json,jsx,less}": [
    "prettier-files check",
    "git add"
  ],
  "**/*.{js,jsx}": "npm run lint-staged:js" // eslint相关逻辑
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
```

## License

MIT  license

MIT