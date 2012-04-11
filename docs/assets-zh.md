## Assets

### 命名

首先，請將您的 CSS 檔放到 `path-to-project/public/css` 資料夾，js 檔放到 `path-to-project/public/js` 資料夾。

然後在您的文字編輯器打開這個檔案 `path-to-project/config/assets.yml` ，會看到以下預設的檔案內容：

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

在 `path` 區塊裡的 `css: css` 指的是， Coke 會去 `path-to-project/public/css` 找您的 CSS 檔，但如果改成：

    ---
    path:
      output: assets
      css: style
      js: js

Coke 就會去 `path-to-project/public/style` 資料夾找您的 CSS 檔。

接下來請看下面這段：

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

上面這段的意思是「有兩個 CSS 群組，一個叫做 `common` ，一個叫做 `scaffold`，呼叫 `common` 這個群組的時候，Coke 會自動去拿 `path-to-project/public/css/common` 資料夾裡面的 `reset.css`、`util.css`、`base.css`、`header.css`、`nav.css`、`flash.css`、`footer.css` 這些 CSS 檔，如果呼叫 `scaffold` 這個群組的時候，Coke 則會去找 `path-to-project/public/css/` 資料夾裡面的 `scaffold.css`。」。

需要注意的是，`common` 是預設會載入的群組，不用另外寫指令就會幫您載入。

如果新增一個叫做 `contact` 的群組，呼叫 `contact` 群組的時候想要拿 `path-to-project/public/css/` 資料夾裡的 `contact.css` 這個檔案的話，可以這樣寫：

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
          - contact
      scaffold:
        site:
          - scaffold

如果想要把別的網站上的檔案拿來用，則可以把檔案路徑放到 `cdn` 這個子群組底下：

    js:
      # js group name
      common:
        cdn:
          - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
        site:
          - common/ga

`jquery.min.js` 是放在別的網站上的檔案，但可以透過 `cdn` 這個子群組設定來取用，而 `site` 子群組是拿目前網站上的檔案來用。

### 取用

在 `assets.yml` 設定好群組之後，取用的方法很簡單，只要在任何一個 view 加上：

    <? it.styles.push( 'contact' ); ?>
    <? it.scripts.push( 'test' ); ?>

就可以把 CSS `contact` 群組跟 js `test` 群組的檔案拉進來了。