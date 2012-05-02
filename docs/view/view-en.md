# View

## View in MVC

You may heard about `View` when talking about MVC, the `View` part means the interface which users uses to interact with our website. View could consist of one or many HTML files ( header.html, sidebar.html, footer.html, etc ).



## Why Using Framework?

When writing static sites without using frameworks, every page is single html file. But there are many common parts in pages, such as header, footer and sidebar, these parts tend to remain the same among pages. Because of the duplicate code, writing static sites without frameworks usually makes code hard to maintain and hard to modified. So programmers usually suggest you to start using layout system in framework for drawing out the common parts to files, one file for header, one file for footer, one file for sidebar, etc. After drawing out the common parts, codes become easy to find and easy to maintain. Because each line only appear once, that means change one line in header will affect all pages using header. This will reduce much time on maintaining.

Of course COKE have its own layout system, please read the following parts.



## Layout

So how can we darwing out the common parts? Usually there are many parts in one page, such as header, sidebar, footer and main content, and a big block to wrap all parts mentioned above. We can drawing out the parts mentioned above to extinct files, puts header to `header.html`, sidebar to `sidebar.html`, footer to `footer.html`.  Because main content usually changes among pages, it should stored in different files. The common parts can stored in folder `common`, and parts change often should stored in different files and folders. For example, contact information can be stored in `contact/index.html`, article stored in `article/index.html`, portfolio stored in `portfolio/index.html`, as for the big block to wrap all parts mentioned above, COKE stored it in `layout/default.html` by default.



## Template Parser Syntax

The template parser COKE uses is [thunder](https://github.com/dreamerslab/thunder), I will introduce the basic ways to use it, you can read the details in [thunder](https://github.com/dreamerslab/thunder) on github :)



### Evaluation

Evaluate javascript expression

> `<? ?>`

    <? if( it.user ){ ?>
      <p>User exist</p>
    <? } ?>



### Interpolation

Simple output ( no escape )

> `<?= ?>`

    // script = '<script>alert( \'this is harmful\' );</script>';
    <?= it.script ?>
    // prints out <script>alert( 'this is harmful' );</script>



### Interpolation With HTML Escaping

Simple output ( escape ) |  `& < > "` --> `&amp; &lt; &gt; &quot;`

> `<?- ?>`

    // script = '<script>alert( \'this is harmful\' );</script>';
    <?- it.script ?>
    // prints out &lt;script&gt;alert( 'this is gonna be fine' );&lt;script/&gt;



## Action View

Every action in controllers is paired with a view. If there's a action call `index` in `contact` controller, the `index` action is paired with `index.html` view in folder `contact`, the code in controller should look like this:

    res.render( 'contact/index' );



## Render Options

Also there are many options when you use `res.render()`. That's say you rarely use layout system, you can modified the configs in `config/dev/express.js` to disable it, first find the following three lines in `config/dev/express.js`:

    app.set( 'view options', {
      layout : 'layouts/default'
    });

Then change it into:

    app.set( 'view options', {
      layout : false
    });

The layout system is disabled now. The config file which development mode uses is placed in folder `config/dev`, and the config file which production mode uses is placed in folder `config/prod`, the config file which test mode uses is placed in folder `config/test`.

If you want to use the layout system temporarily when it's disabled, you can do this when use `res.render()`:

    res.render( 'contact/index', {
      layout : true
    });

If you want to use `mylayout.html` instead of the default layout file, you can do this:

    res.render( 'page', {
      layout : 'mylayout'
    });

If you want to use other language, you can do this:

    res.render( 'page', {
      layout : 'mylayout.jade'
    });

The path of layout file also can be absolute:

    res.render( 'page', {
      layout : BASE_DIR + '/../../mylayout.jade'
    });

If you use `ejs`, and want to set the opening tag and closing tag, you can do this:

    app.set( 'view options', {
      open  : '{{',
      close : '}}'
    });



## Partial

If you find other common parts in the view, you can draw out these common parts to `partial`, then add these `partial` to views by using:

    <?= it.partial( 'contact/_base' ); ?>

Then the partial `_base.html` in folder `view/contact` will be added to the view. For distinguish partial from view, the names of partial usually start with `_`.



## Production Mode with Cache

The view caching will be enabled after switching to `production` mode. For switching to `production` mode, type this in terminal:

    $ NODE_ENV=production node app.js