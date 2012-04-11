# Assets

COKE uses a YAML file to manage all the assets. We can setup groups of `css` and `js`, they will be listed one by one in development mode for easlier debugging, and will be compressed and minified in groups with versions hash in production mode.



## Configurations

All the assets configurations are in the `config/assets.yml` file. It should look something like the following by default.

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



## Naming

The default `stylesheet` and `javascript` directorys are called `css` and `js`. You can change them to whatever we like such as `stylesheets` and `javascripts`.

    path:
      output: assets
      css: stylesheets
      js: javascripts



## Assets groups

Let's take a look at the next block

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

In this case there are two groups `common` and `scaffold`. With the `common` group, COKE generates

    /css/common/reset.css
    /css/common/util.css
    /css/common/base.css
    /css/common/header.css
    /css/common/nav.css
    /css/common/flash.css
    /css/common/footer.css

links to map all the files in the directory `public/css/common`. With `scaffold` group, COKE generates `/css/scaffold.css` link to map `public/css/scaffold.css`.



### Adding new groups

Say we want to add a new group called `contact` with 2 css files `base` and `mail`, the configurations will be something like this

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




### Default group

COKE has a default group `common` for both `css` and `js`. It will not generate anyting if we leave them blank.



### CDN

Most of the time we do not want to host jQuery or other popular assets files ourself. We can list them in the cdn block. They will not be merged and minified on production.

    js:
      # js group name
      common:
        cdn:
          - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
        site:
          - common/ga



## Using asset groups in the view

After setting up the configuration in `assets.yml`, we can call the following helpers to use them in the view

    <? it.styles.push( 'contact' ); ?>
    <? it.scripts.push( 'test' ); ?>



## Production

As we mentioned earlier the assets will be compressed and minified in groups with versions hash in production mode. The output directory is `public/assets/` by default. We can change it in the config file as we change the `css` and `js` directory name. Also we can set the `asset_host` in the config and upload the assets to another domain such as our subdomain or aws s3 for faster assets loading.

