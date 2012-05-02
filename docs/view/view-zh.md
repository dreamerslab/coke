# View

## MVC 裡面的 View 指的是？

MVC 裡的 View 是指使用者使用到的介面，View 可以由一段完整的 HTML 或是很多 HTML 片段（例如 header、sidebar、footer）所組成。



## 為什麼要用 Framework 來寫網站？

在沒使用 framework 的情況下寫靜態網站，每一頁都會是一個獨立的 HTML 檔案，但一個網站通常會有很多重複的的地方，例如 logo 、最底下的 footer 還有 sidebar 的內容通常不會變動很多甚至根本沒有變動，這時候就要寫很多重複的程式，這樣會導致程式很難管理、而且會變得比較肥、修改的時候要一個一個檔案去改，所以通常會建議使用 framework 提供的 layout system 去管理，把重複的部份抽出來變成一個獨立的檔案，這樣除了找程式比較好找，以後需要修改重複的部份，只要改一個地方，所有的網頁就都被改好了，可以減少很多「改了東，卻忘記改西」的情況發生。

COKE 當然也有自己的 layout system，請繼續看以下的介紹。



## Layout

看完上面為什麼要使用 framework 的說明，接下來要介紹的是切割重複區塊的原則。通常一個網頁會有 header（通常導覽列也在 header 裡）、sidebar、footer 跟主要內容的區塊，還會有一個比較大的區塊用來包住上述的區塊，前面所提到的每個區塊都可以各別寫成一個檔案，例如 header 的部份就寫到 `header.html` 、sidebar 的部分就寫到 `sidebar.html` ，footer 的部分就寫到 `footer.html` ，由於主要的內容比較會變化，所以要分開並且搭配 controller 來擺放，以上共同的部份通常會放到 `common` 這個資料夾，比較會變動的部份建議各自成立資料夾擺放檔案，例如聯絡資料的區塊就放到 `contact/index.html`，文章就放到 `article/index.html`，作品集就放到 `portfolio/index.html`，至於最外面的區塊，目前 COKE 已經有自動產生了一個檔案來放，預設是放到 `layouts/default.html` 。



## Template Parser Syntax

COKE 使用的 template parser 是 [thunder](https://github.com/dreamerslab/thunder)，這邊會簡單地介紹用法，如果需要更完整的說明可以到 [thunder](https://github.com/dreamerslab/thunder)。



### 直接執行 JavaScript

用以下的語法可以直接執行 JavaScript

> `<? ?>`

    <? if( it.user ){ ?>
      <p>User exist</p>
    <? } ?>

### 輸出變數的值

以下的語法會 print 出變數的值

> `<?= ?>`

    // script = '<script>alert( \'this is harmful\' );</script>';
    <?= it.script ?>
    // prints out <script>alert( 'this is harmful' );</script>

### 先處理 escape 再輸出變數的值

以下的語法會先處理好 escape 之後再 print 出變數的值，會把 `& < > "` 轉換成 `&amp; &lt; &gt; &quot;`

> `<?- ?>`

    // script = '<script>alert( \'this is harmful\' );</script>';
    <?- it.script ?>
    // prints out &lt;script&gt;alert( 'this is gonna be fine' );&lt;script/&gt;



## Action View

每個 controller 的每個 action 都會對應到一個 view 。例如 `contact` controller 裡有個 action 叫 `index`， `index` 對應到的 view 是 `contact` 資料夾底下的 `index.html` ，在 controller 裡就可以這樣寫：

    res.render( 'contact/index' );



## Render Options

在執行 `res.render()` 的時候也有很多設定可以調整，例如如果很少使用 layout system 來管理 view ，就可以在 `config/dev/express.js` 找到下面三行：

    app.set( 'view options', {
      layout : 'layouts/default'
    });


改成：

    app.set( 'view options', {
      layout : false
    });

這樣就可以把 layout system 停用。 development 模式用的 express.js 在 `config/dev/` ，production 模式的在 `config/prod/` ， test 模式的在 `config/test/`。



如果想要在 layout system 停用的情況下想要臨時用一下的話，可以在 render 的時候寫：

    res.render( 'contact/index', {
      layout : true
    });



如果已經有設定 layout 要使用哪個檔案，但 render 某個 view 的時候想要換成 `mylayout.html` 這個檔案的話，就可以寫：

    res.render( 'page', {
      layout : 'mylayout'
    });



如果想要使用別的語法寫成的檔案，就可以寫：

    res.render( 'page', {
      layout : 'mylayout.jade'
    });



也可以用絕對路徑來指定 layout 的位置：

    res.render( 'page', {
      layout : BASE_DIR + '/../../mylayout.jade'
    });



（問 ben 這段是怎麼用，或是再查一下 ejs 是怎麼寫）如果用的是 `ejs` 格式的ˊ檔案，又想要指定 opening tag 跟 closing tag ，可以這樣寫：

    app.set( 'view options', {
      open  : '{{',
      close : '}}'
    });



## 局部樣版 Partial

如果按照 layout 切了一些檔案，但是又發現有些 view 裡還有重複的地方，這時候就可以抽出來做成局部樣版 partial ，然後在 view 裡加上：

    <?= it.partial( 'contact/_base' ); ?>

這樣就可以呼叫在 `views/contact` 資料夾裡面的 partial `_base.html` 。通常命名 partial 的時候為了跟一般的 view 區隔開來，都會用底線 `_` 做為檔名的開頭。

## Production 模式的快取

改成 `production` 模式之後，view caching 就會啟動，如果要轉換到 `production` 模式的話，請在終端機輸入：

    $ NODE_ENV=production node app.js