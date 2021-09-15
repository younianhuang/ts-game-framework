# grani-ts

A lightweight, extendable game framework with typescript.
***
## 發布套件

完整的說明請參考
https://docs.gitlab.com/ee/user/packages/npm_registry/
### Authenticating to the Package Registry
1. 產生 personal access token，必須啟用two-factor authentication，scope api 要打開。

    * 注意
      開啟 two-factor authentication後，必須用有 write_repository scope 才能 push。

      解決方法
      1.執行 git config --global credential.helper store
      2.在push或 pull時會提示輸入帳號密碼，將密碼輸入 access token

2. 設定 npm configuration

    執行

    npm config set @pegacorn:registry https://gftygitlab.awoplay.com/api/v4/projects/311/packages/npm/
    npm config set -- '//gftygitlab.awoplay.com/api/v4/projects/311/packages/npm/:_authToken' "<your_token>"

    或者更改 home 或專案目錄下的 .npmrc
    @pegacorn:registry=https://gftygitlab.awoplay.com/api/v4/projects/311/packages/npm/
    //gftygitlab.awoplay.com/api/v4/projects/311/packages/npm/:_authToken=<your_token>

### publish package

執行

npm publish

### upate package version

執行

npm version patch  或者

npm version minor  或者

npm version major
### install package

執行yarn add @pegacorn/grani-ts


### upgrade package


執行 yarn upgrade @pegacorn/grani-ts


***