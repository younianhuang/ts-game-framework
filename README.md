# grani-ts

A lightweight, extendable game framework with typescript.
***
### Authenticating to GitHub Packages
```
下面兩種方法其中一種

1.設定.npmrc
將專案根目錄/.npmrc 或 ～/.npmrc，內容設定如下

//npm.pkg.github.com/:_authToken=TOKEN

TOKEN 為 github 的 personal access token

2.npm login

執行下列指令
npm login --scope=@pegacorn-grani --registry=https://npm.pkg.github.com

Username: USERNAME
Password: TOKEN
Email: PUBLIC-EMAIL-ADDRESS
```
### publish package

```
首先先設定認證，方法為 Authenticating to GitHub Packages 所述。

接著設定 registry，可使用下面兩種方法其中一種

1.   設定 .npmrc
@pegacorn-grani:registry=https://npm.pkg.github.com

2.  設定 package.json

package.json 中增加
"publishConfig": {
    "@pegacorn-grani:registry":"https://npm.pkg.github.com/"
},

執行
npm publish
發佈版本
```

### upate package version
```
執行
npm version patch  或者
npm version minor  或者
npm version major
```
### install package
```
與publish package 相同的方法設定 registry 與認證。

執行yarn add @pegacorn-grani/game-framework

```

### upgrade package
```
與publish package 相同的方法設定 registry 與認證。

執行 yarn upgrade @pegacorn-grani/game-framework
```

