# Command line tools

## Command list

    $ coke
    Usage: coke [command] [argument(s)]

    Commands:
      -v, --version                             Display coke version
      h,  help                                  Display usage information
      n,  new                                   Create a new coke app
      g,  generate [generator] [args] [options] Generate code templates
      r,  routes [filter]                       Display application routes
      c,  console                               Debug console
      s,  server                                Run coke server

    Available generators:
      model controller scaffold



## Generators

To generate a new project

    $ coke new awesomeapp
    create  awesomeapp/
    create  awesomeapp/app/
    create  awesomeapp/app/controllers/
    create  awesomeapp/app/helpers/
    create  awesomeapp/app/libs/
    create  awesomeapp/app/locales/
    create  awesomeapp/app/locales/en/
    create  awesomeapp/app/middlewares/
    create  awesomeapp/app/models/
    create  awesomeapp/app/views/
    create  awesomeapp/app/views/common/
    create  awesomeapp/app/views/error/
    create  awesomeapp/app/views/layouts/
    create  awesomeapp/app/views/welcome/
    create  awesomeapp/config/
    create  awesomeapp/config/dev/
    create  awesomeapp/config/prod/
    create  awesomeapp/config/test/
    create  awesomeapp/db/
    create  awesomeapp/doc/
    create  awesomeapp/log/
    create  awesomeapp/public/
    create  awesomeapp/public/assets/
    create  awesomeapp/public/css/
    create  awesomeapp/public/css/common/
    create  awesomeapp/public/img/
    create  awesomeapp/public/js/
    create  awesomeapp/public/js/common/
    create  awesomeapp/tmp/
    create  awesomeapp/test/
    create  awesomeapp/app/controllers/application.js
    create  awesomeapp/app/controllers/welcome.js
    create  awesomeapp/app/helpers/application.js
    create  awesomeapp/app/libs/.gitkeep
    create  awesomeapp/app/locales/en/welcome.js
    create  awesomeapp/app/middlewares/csrf.js
    create  awesomeapp/app/middlewares/err404.js
    create  awesomeapp/app/middlewares/err500.js
    create  awesomeapp/app/middlewares/session.js
    create  awesomeapp/app/models/.gitkeep
    create  awesomeapp/app/views/common/_nav.html
    create  awesomeapp/app/views/error/404.html
    create  awesomeapp/app/views/error/500.html
    create  awesomeapp/app/views/layouts/default.html
    create  awesomeapp/app/views/welcome/index.html
    create  awesomeapp/config/dev/config.yml
    create  awesomeapp/config/dev/express.js
    create  awesomeapp/config/prod/config.yml
    create  awesomeapp/config/prod/express.js
    create  awesomeapp/config/test/config.yml
    create  awesomeapp/config/test/express.js
    create  awesomeapp/config/assets.yml
    create  awesomeapp/config/routes.js
    create  awesomeapp/db/schema.js
    create  awesomeapp/doc/README.md
    create  awesomeapp/log/monit.log
    create  awesomeapp/log/nginx.log
    create  awesomeapp/log/static.log
    create  awesomeapp/log/upstart.log
    create  awesomeapp/public/assets/.gitignore
    create  awesomeapp/public/css/common/base.css
    create  awesomeapp/public/css/common/flash.css
    create  awesomeapp/public/css/common/footer.css
    create  awesomeapp/public/css/common/header.css
    create  awesomeapp/public/css/common/nav.css
    create  awesomeapp/public/css/common/reset.css
    create  awesomeapp/public/css/common/util.css
    create  awesomeapp/public/img/sprite.png
    create  awesomeapp/public/img/.gitkeep
    create  awesomeapp/public/js/common/ga.js
    create  awesomeapp/public/apple-touch-icon-57x57-precomposed.png
    create  awesomeapp/public/apple-touch-icon-72x72-precomposed.png
    create  awesomeapp/public/apple-touch-icon-114x114-precomposed.png
    create  awesomeapp/public/apple-touch-icon-129x129-precomposed.png
    create  awesomeapp/public/apple-touch-icon-precomposed.png
    create  awesomeapp/public/apple-touch-icon.png
    create  awesomeapp/public/favicon.ico
    create  awesomeapp/public/robots.txt
    create  awesomeapp/test/.gitkeep
    create  awesomeapp/tmp/.gitkeep
    create  awesomeapp/.gitignore
    create  awesomeapp/package.json
    create  awesomeapp/README.md
    create  awesomeapp/server.js

To generate a scaffolding resource, which includes the model, controller and views

    # the syntax is `coke g model [model_name] [porp:format] [another_porp:format]`
    # ex.
    $ coke g scaffold posts title:string content:string
    exists  app/
    exists  app/controllers/
    exists  app/models/
    exists  app/views/
    create  app/views/posts/
    update  db/schema.js
    create  app/models/Post.js
    create  app/views/posts/_form.html
    create  app/views/posts/edit.html
    create  app/views/posts/index.html
    create  app/views/posts/new.html
    create  app/views/posts/show.html
    update  app/views/common/_nav.html
    create  public/css/scaffold.css
    create  app/controllers/posts.js
    update  config/routes.js

To generate a model

    # the syntax is `coke g model [model_name] [porp:format] [another_porp:format]`
    # ex.
    $ coke g model comment _post:'ObjectId' content:string
    exists  app/
    exists  app/models/
    update  db/schema.js
    create  app/models/Comment.js

To generate a controller

    # the syntax is `coke g controller [controller_name] [action_name] [another_action_name]`
    # ex.
    $ coke g controller notifications latest hottest
    exists  app/
    exists  app/controllers/
    exists  app/views/
    create  app/views/notifications/
    create  app/views/notifications/latest.html
    create  app/views/notifications/hottest.html
    create  app/controllers/notifications.js
    update  config/routes.js



## Routes

You can list all the routes of your current project by

    $ coke r
      latest_notifications GET    /notifications/latest    notifications#latest
     hottest_notifications GET    /notifications/hottest   notifications#hottest
                     posts GET    /posts.:format?          posts#index
                     posts POST   /posts.:format?          posts#create
                  new_post GET    /posts/new.:format?      posts#new
                 edit_post GET    /posts/:id/edit.:format? posts#edit
                      post DELETE /posts/:id.:format?      posts#destroy
                      post PUT    /posts/:id.:format?      posts#update
                      post GET    /posts/:id.:format?      posts#show
                      root GET    /                        welcome#index



## Console mode

To directly interact with your project's models, you can enter the console mode by

    $ coke c
    coke>

Note that you have to start MongoDB first to enter the console, and you can press `Ctrl + C` two times to leave console.



## Start server

To start the server to test your project on a default port of 4000.

    $ coke s
    [ SYSTEM ] Fri Mar 16 2012 01:12:36 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: logger

    [ SYSTEM ] Fri Mar 16 2012 01:12:36 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: utils

    [ SYSTEM ] Fri Mar 16 2012 01:12:36 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: model

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Loading model: Comment

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Loading model: Post

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: All models loaded

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Database connected at: mongodb://localhost:27017/awesomeapp-dev

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: express

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Building middleware: csrf

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Building middleware: err404

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Building middleware: err500

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Building middleware: session

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: lib

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Loading helper: application

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: assets

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Overwriting express res.send

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: controller_bridge

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/notifications/latest for route: notifications#latest

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/notifications/hottest for route: notifications#hottest

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/index for route: posts#index

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/create for route: posts#create

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/new for route: posts#new

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/edit for route: posts#edit

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/destroy for route: posts#destroy

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/update for route: posts#update

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/posts/show for route: posts#show

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: Dispatching controller: /private/tmp/awesomeapp/app/controllers/welcome/index for route: welcome#index

    [ SYSTEM ] Fri Mar 16 2012 01:12:37 GMT+0800 (CST)
    - pid: 3013
    - msg: loading core module: server

    [ SYSTEM ] Thu Mar 15 2012 17:12:37 GMT+0000 (UTC)
    - pid: 3013
    - msg: Server running at http://127.0.0.1:4000/

    [ SYSTEM ] Thu Mar 15 2012 17:12:37 GMT+0000 (UTC)
    - pid: 3013
    - msg: loading core module: started

## Writing your own generators

Todos...
