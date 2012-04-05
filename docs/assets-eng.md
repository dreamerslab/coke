## Assets

### Naming

First, you need to put your CSS files to the folder `path-to-project/public/css` and put js files to the folder `path-to-project/public/js`.

Then open `path-to-project/config/assets.yml` this yaml file, and the default configuration should look like this:

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

The `css: css` in "path" block means Coke will find your CSS files in `path-to-project/public/css`, if you changed it to:

    ---
    path:
      output: assets
      css: style
      js: js

Then Coke will find your css files in `path-to-project/public/style`.

Let's take a look at next paragraph:

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

This means "There are two groups, one is called `common`, and the other one is called `scaffold`. When you use `common` group, Coke will pull `reset.css`, `util.css`, `base.css`, `header.css`, `nav.css`, `flash.css` and `footer.css` in the folder `path-to-project/public/css/common` to the web page for you. When you use `scaffold` group, Coke will pull `scaffold.css` in the folder `path-to-project/public/css` for you."

Coke will pull the `common` group for you by default.

If you want to add a new group called `contact`, and want to pull `contact.css` in the folder `path-to-project/public/css/` when you use `contact` group, you can set the configuration like this:

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

If you want to use files on other sites, you can added the url of the fils in `cdn` sub group like this:

    js:
      # js group name
      common:
        cdn:
          - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
        site:
          - common/ga

The `site` sub group will pull files from your site, and `cdn` sub gruop will pull files from other sites.

### Picking

After setting the configuration in `assets.yml`, you can pull any group to any view you want, just add these two line in your view file:

    <? it.styles.push( 'contact' ); ?>
    <? it.scripts.push( 'test' ); ?>

The CSS `contact` group and js `test` group will be pulled into your web page.
