# Assets

COKE 透過 YAML 檔來管理 assets，可以在設定檔裡設定 `css` 跟 `js` 的群組，然後 COKE 會按照設定去取用指定的群組跟檔案。為了方便 debug，所以在 `develoment` 模式 COKE 會各別列出指定的檔案，但在 `production` 模式，COKE 會幫每個有使用到的群組都各別壓縮成一個有版本號的檔案，例如要使用 css 的 `common` 群組跟 `contact` 群組，在 `production` 模式的時候 COKE 會把 `common` 群組裡所有的檔案壓縮成一個 css 檔、`contact` 群組裡所有的檔案壓成另一個 css 檔。



## Configurations

Assets 設定檔的位置在 `config/assets.yml` ，以下是預設的設定。

    ---
    path:
      output: assets
      css: css
      js: js

    # cdn setting
    asset_host:
      # - http://assets1.example.com
      # - http://assets2.example.com

    css:
      # css group name
      common:
        site:
          - common/reset
          - common/util
          - common/base
          - common/header
          - common/nav
          - common/flash
          - common/footer
      scaffold:
        site:
          - scaffold

    js:
      # js group name
      common:
        cdn:
          - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
        site:
          - common/ga



## 命名

預設的 `stylesheets` 、 `javascripts` 資料夾路徑是 `css` 、 `js` ，你可以把 `css` 跟 `js` 改成你想要的名字，例如 `stylesheets` 跟 `javascripts`，修改後就會變成：

    path:
      output: assets
      css: stylesheets
      js: javascripts



## Assets 群組

接下來請看下一個區塊：

    css:
      # css group name
      common:
        site:
          - common/reset
          - common/util
          - common/base
          - common/header
          - common/nav
          - common/flash
          - common/footer
      scaffold:
        site:
          - scaffold

這個區塊有兩個群組，一個叫 `common`，另一個叫 `scaffold`，COKE 呼叫 `common` 群組的時候，會把 `public/css/common` 資料夾裡的檔案都放進 view 裡並產生連結：

    /css/common/reset.css
    /css/common/util.css
    /css/common/base.css
    /css/common/header.css
    /css/common/nav.css
    /css/common/flash.css
    /css/common/footer.css

在呼叫 `scaffold` 群組的時候， COKE 會幫 `public/css/scaffold` 資料夾裡的 `scaffold.css` 在 view 裡產生連結。



### 新增群組

如果要新增一個群組叫做 `contact`，而這個群組有 `base` 、 `mail` 兩個 css 檔，以下是新增後的結果：

    css:
      # css group name
      common:
        site:
          - common/reset
          - common/util
          - common/base
          - common/header
          - common/nav
          - common/flash
          - common/footer
      contact:
        site:
          - contact/base
          - contact/mail
      scaffold:
        site:
          - scaffold



### 預設會載入的群組

COKE 預設會載入 `css` 跟 `js` 的 `common` 群組，但如果 `common` 群組裡不填任何東西的話，COKE 就不會產生 `common` 群組的連結。



### CDN

通常在做網站的時候，不會把 jQuery 或是其他很知名的檔案放到自己的網站上，這時候就可以把這些檔案的連結放到 cdn 這個區塊，但 COKE 不會壓縮 cdn 區塊的檔案。

    js:
      # js group name
      common:
        cdn:
          - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
        site:
          - common/ga

## 將 assets 群組放進 view

完成了以上的設定之後，就可以在 view 裡透過以下的 helper 把群組放進 view 裡：

    <? it.styles.push( 'contact' ); ?>
    <? it.scripts.push( 'test' ); ?>



## Production 模式

在 `production` 模式，COKE 預設輸出 assets 的資料夾是 `public/assets/` ，如果要更改的話，把 `path` 區塊的 `output` 改成想要輸出的資料夾名稱即可。如果為了讓使用者可以更快的下載檔案，要把 assets 放在 aws s3 或是其他的地方，可以在 `asset_host` 設定。