# grani-ts

A lightweight, extendable game framework with typescript.
***
## 發布套件

完整的說明請參考
https://docs.gitlab.com/ee/user/packages/npm_registry/
### Authenticating to the Package Registry
1. 產生 personal access token，必須啟用two-factor authentication，scope api 要打開。

    * 注意!

      開啟 two-factor authentication後，必須用有 write_repository scope access token 登入 才能 push。

      解決方法

      1.執行 git config --global credential.helper store

      2.在push或 pull時會提示輸入帳號密碼，將密碼輸入 access token

2. 設定 npm configuration

    更改 home 或專案根目錄下的 .npmrc

    @pegcornteam:registry=https://gftygitlab.awoplay.com/api/v4/packages/npm/
    //gftygitlab.awoplay.com/api/v4/packages/npm/:_authToken=:_authToken=<your_token>
    //gftygitlab.awoplay.com/api/v4/projects/311/packages/npm/:_authToken=<your_token>

    * ps 當有多個套件需要匯入，寫法如下
    @pegcornteam:registry=https://gftygitlab.awoplay.com/api/v4/packages/npm/
    //gftygitlab.awoplay.com/api/v4/packages/npm/:_authToken=:_authToken=<your_token>
    //gftygitlab.awoplay.com/api/v4/projects/<project id 1>/packages/npm/:_authToken=<your_token>
    //gftygitlab.awoplay.com/api/v4/projects/<project id 2>/packages/npm/:_authToken=<your_token>

### publish package

執行

npm publish

### upate package version

執行

npm version patch  或者

npm version minor  或者

npm version major
### install package

執行yarn add @pegcornteam/grani-ts


### upgrade package


執行 yarn upgrade @pegcornteam/grani-ts


***

## 發佈到 Github package

### .npmrc 設定
@pegacorn-grani:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=Token

### package.json 設定
將package.json設定為
"name": "@pegacorn-grani/grani-ts",

