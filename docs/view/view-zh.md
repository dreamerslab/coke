# View

## MVC 裡面的 View 指的是？

MVC 裡的 View 是指使用者使用到的介面，View 可以由一段完整的 HTML 或是很多 HTML 片段（例如 header、sidebar、footer）所組成。



## 為什麼要用 Framework 來寫網站？

在沒使用 framework 的情況下寫靜態網站，每一頁都會是一個獨立的 HTML 檔案，但一個網站通常會有很多重複的的地方，例如 logo 、最底下的 footer 還有 sidebar 的內容通常不會變動很多甚至根本沒有變動，這時候就要寫很多重複的程式，這樣會導致很難管理程式、程式會變得比較肥、要修改的時候就要一個一個檔案去改，所以通常會建議使用 framework 提供的 layout system 去管理這些程式，把重複的部份抽出來變成一個獨立的檔案，這樣除了找程式比較好找，以後需要修改重複的部份，只要改一個地方，所有的網頁就都被改好了，可以減少很多「改了東，卻忘記改西」的情況發生。

COKE 當然也有自己的 layout system，請繼續看以下的介紹。



## Layout

### 簡單說明可以怎麼規劃 layout 跟放 view 的資料夾結構（把都會用到的 view 放在 `common` 資料夾裡，其他的就配合 controller ，一個 controller 一個資料夾。）

看完上面為什麼要使用 framework 的說明，接下來要介紹的是切割重複區塊的原則。通常一個網頁會有 header（通常導覽列也在 header 裡）、sidebar、footer 跟主要內容的區塊，還會有一個比較大的區塊用來包住上述的區塊，前面所提到的每個區塊都可以各別寫成一個檔案，例如 header 的部份就寫到 `header.html` 、sidebar 的部分就寫到 `sidebar.html` ，footer 的部分就寫到 `footer.html` ，主要的內容比較會變化，所以就要重複的部份分開放，以上共同的部份通常會放到 `common` 這個資料夾，比較會變動的部份建議各自成立資料夾擺放檔案，例如



## Template Syntax

說明下面的語法怎麼使用，使用 helper 的語法跟用 it. 來新增變數的方法也在這邊說明。

    <? ?>
    <?= ?>



## Render options

（這邊是指可以用其他的語法來產生 HTML 的意思嗎？）




## Action view

一個 action 對應一個 view 。

    res.render( 'contact/index', {
      email : 'coke@fake.com',
      name  : 'My Name',
      msg   : 'Thanks for using COKE :)'
      });



## Partial

一般的網頁都會有 header 、 sidebar 、 footer ，主要的內容也會佔有一個很大的區塊，但當使用者換到另外一頁的時候，通常只有內容區塊會改變，所以為了不重複撰寫那些沒有經常變動的 HTML 區塊，會使用 layout system 來切割網頁，把各個區塊分成獨立的檔案，有用到某個區塊的時候再呼叫進來就可以了。

說明如何使用以下的語法

    <?= it.partial( 'contact/_base' ); ?>
