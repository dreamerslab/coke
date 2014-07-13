# Histroy

## 0.21.1 / 2014-07-13
- [update packages] express->4.6.1, express-session->1.6.5, serve-static->1.3.2



## 0.21.0 / 2014-07-08
- [new feature] support css media query
- [update packages] body-parser->1.4.3, cookie-parser->1.3.2, connect-multiparty->1.1.0, csurf->1.3.0, errorhandler->1.1.1, express-session->1.6.4, moment->2.7.0, mongoose->3.8.12, serve-favicon->2.0.1, serve-static->1.3.0, sitemap->0.7.3, express->4.5.1, inflection->1.3.8, js-yaml->3.1.0, should->4.0.4



## 0.20.4 / 2014-05-25
- [bug fix] add serve-favicon and serve-static todependencies



## 0.20.3 / 2014-05-25
- [bug fix] add missing middlewares in generator



## 0.20.2 / 2014-05-25
- [bug fix] typo



## 0.20.1 / 2014-05-25
- [bug fix] add missing middlewares in generator



## 0.20.0 / 2014-05-25
- [refactoring] use proper status code in application controller
- [new feature] ability to use model outside of the application scope



## 0.19.0 / 2014-05-24
- [update packages] body-parser->1.2.0, cli-color->0.3.2, cookie-parser->1.1.0, connect-mongo->0.4.1, connect-multiparty->1.0.3, csurf->1.2.0, errorhandler->1.0.1, express->4.3.1, express-session->1.2.0, method-override->1.0.2, mongoose->3.8.11, serve-favicon->2.0.0, serve-static->1.1.0, should->3.3.2
- [refactoring] add removed connect middlewares
- [refactoring] adopt express 4 changes
- [refactoring] merge production logs to one file ( coke.log )
- [refactoring] split cookie secret from session



## 0.18.14 / 2014-04-23

- [bug fix] fix crash problem while booting server
- [update packages] should->3.3.1



## 0.18.13 / 2014-04-08

- [refactor] refactor migration and load whole environment while do migration
- [update packages] express->3.5.1, inflection->1.3.5, js-yaml->3.0.2, node.extend->1.0.10, railway-routes->0.0.10, should->3.3.0, moment->2.6.0, mongoose->3.8.8, sitemap->0.7.2



## 0.18.12 / 2014-01-09

- [update packages] rmdir->1.0.4, mongoose->3.8.4



## 0.18.11 / 2014-01-07

- [bug fix] Context bug in `stach.js`
- [refactoring] Allow `null` var for logger config
- [update packages] node.extend->1.0.9



## 0.18.10 / 2013-12-27

- [bug fix] Added error handle for controller stack
- [refactoring] Enable output log in terminal on production mode



## 0.18.9 / 2013-12-27

- [bug fix] Use node default `server.close` instead of express `app.close`



## 0.18.8 / 2013-12-27

- [update packages] js-yaml->3.0.1, moment->2.5.0
- [refactoring] Apply helper to app level


## 0.18.7 / 2013-12-20

- Added multipart & dynamic_helpers middlewares to configs



## 0.18.6 / 2013-12-20

- [bug fix] `mkdir` if assets output dir is missing



## 0.18.5 / 2013-12-20

- [bug fix] Remove extra trailing slash
- [bug fix] Move `styles`, `scripts` to dynamic helper



## 0.18.4 / 2013-12-19

- [bug fix] Added missing slash AGAIN



## 0.18.3 / 2013-12-19

- [bug fix] Added missing slash



## 0.18.2 / 2013-12-19

- [bug fix] Use `div` tag with id instead of `nav` tag in `nav` partial generator template



## 0.18.1 / 2013-12-19

- [bug fix] Added missing slash in `application controller` generator template
- [bug fix] Use `div` tag with id instead of `nav` tag in `nav` partial generator template
- [refactoring] Remove `;` in view generator template



## 0.18.0 / 2013-12-19

- [update packages] express->3.4.7
- [update packages] Use express-thunder instead of thunder as view management
- [update packages] Drop express-messages. Use built in `flash` instead
- [update packages] Use connect-mongo instead of connect-mongodb for session



## 0.17.4 / 2013-12-18

- [update packages] mongoose->3.8.3, rmdir->1.0.3, thunder->0.1.11



## 0.17.3 / 2013-12-17

- [update packages] node.class->1.1.4



## 0.17.2 / 2013-12-17

- [update packages] node.class->1.1.3



## 0.17.1 / 2013-12-16

- [update packages] node.class->1.1.2



## 0.17.0 / 2013-12-16

- [update packages] js-yaml->3.0.0, mongoose->3.8.2



## 0.16.6 / 2013-12-12

- [bug fix] Pass `Error` to next filter instead of jump out of stack
- [refactoring] Use instance var instead of `this`



## 0.16.5 / 2013-12-11

- [update packages] inflection->1.3.2, js-yaml->2.1.3, moment->2.4.0, mongoose->3.8.1, node.class->1.1.1, node.packer->2.0.3, rmdir->1.0.2, should->2.1.1, sitemap->0.7.1



## 0.16.4 / 2013-10-01

- [update packages] js-yaml->2.1.1
- [bug fix] Model loading sequence



## 0.16.3 / 2013-09-30

- [update packages] mongoose->3.6.20, thunder->0.1.9
- [new feature] Coke now takes none mongoose model



## 0.16.2 / 2013-09-18

- [update packages] cli-color->0.2.3, node.extend->1.0.8, should->1.3.0, moment->2.2.1, mongoose->3.6.19, thunder->0.1.8
- [new feature] Added UTILS.unique & UTILS.extend



## 0.16.1 / 2013-07-20

- [refactoring] Remove useless console.log
- [update packages] moment->2.1.0, mongoose->3.6.15, thunder->0.1.7



## 0.16.0 / 2013-07-19

- [refactoring] Move boot scripts from index to boot



## 0.15.2 / 2013-06-11

- [update packages] inflection->1.2.6, js-yaml->2.1.0, node.extend->1.0.7, mongoose->3.6.11
- [refactoring] Trace error in logger



## 0.15.1 / 2013-04-26

- [update packages] js-yaml->2.0.5, node.extend->1.0.5, mongoose->3.6.8
- [bug fix] Add missing `var`



## 0.15.0 / 2013-04-08

- [update packages] mongoose->3.6.4
- [new feature] Include inflection module in UTILS
- [refactoring] Model builder



## 0.14.1 / 2013-03-24

- [refactoring] Add `tmp` dir to gitignore
- [refactoring] Use view name + hander_id as prod js, css cache key
- [update packages] aws2js->0.8.3, mongoose->3.6.0, railway-routes->0.0.9-1



## 0.14.0 / 2013-03-09

- [refactoring] Helper `css` & `js` result now caches with controller action not view name
- [update packages] cli-color->0.2.2, js-yaml->2.0.3, mongoose->3.5.7, railway-routes->0.0.9, should->1.2.2



## 0.13.13 / 2013-02-19

- [refactoring] Make loading s3 module safer in `coke b`
- [bug fix] Remvoe unloaded `LOG` in cli build
- [update packages] aws2js->0.8.1, js-yaml->2.0.2, railway-routes->0.0.8-7, moment->2.0.0, mongoose->3.5.6



## 0.13.12 / 2013-01-09

- [refactoring] Migration `end` now take args from last action
- [update packages] mongoose->3.5.4, inflection->1.2.5, node.packer->2.0.1



## 0.13.11 / 2013-01-09

- [refactoring] Better error handling in loading configs



## 0.13.10 / 2013-01-08

- [refactoring] Logger now can be force to run in dev mode
- [refactoring] Migration error handeling



## 0.13.9 / 2013-01-07

- [bug fix] Missing file extensino in model builder



## 0.13.8 / 2013-01-06

- [refactoring] Load models with schema keys not base on file names
- [refactoring] Error control for new version of flow
- [bug fix] Export only migrations
- [update packages] aws2js->0.7.9, inflection->1.2.4, node.flow->1.2.2, railway-routes->0.0.8-2, mongoose->3.5.3



## 0.13.7 / 2012-11-30

- [bug fix] Use global for `coke c`
- [update packages] aws2js->0.7.7, js-yaml->1.0.3, node.flow->1.2.0, should->1.2.1, mongoose->3.4.0



## 0.13.6 / 2012-11-2

- [bug fix] Request id jump



## 0.13.5 / 2012-10-29

- [refactoring] Remove liten on `SIGINT` event for gracefully shutdown server



## 0.13.4 / 2012-10-29

- [bug fix] Pushed `undefined` assets group in view result in 500 error. https://github.com/dreamerslab/coke/issues/23



## 0.13.3 / 2012-10-26

- [refactoring] Gracefully shutdown server



## 0.13.2 / 2012-10-23

- [update packages] node.packer->2.0.0



## 0.13.1 / 2012-10-16

- [bug fix] `cli-color` changes `gary` to `brightBlack`
- [update packages] mongoose->3.3.1



## 0.13.0 / 2012-10-8

- [refactoring] For name confict, switch `typeof` back to `is`
- [update packages] mongoose->3.2.1, aws2js->0.7.5, cli-color->0.2.1, moment->1.7.2



## 0.12.6 / 2012-09-28

- [refactoring] Move `asset_host` out of assets config



## 0.12.5 / 2012-09-27

- [bug fix] Empty `asset_host` in prod mode



## 0.12.4 / 2012-09-26

- [bug fix] `cli-color` api change



## 0.12.3 / 2012-09-26

- [refactoring] Make testing env as similar as the prod env



## 0.12.2 / 2012-09-07

- [refactoring] Remove useless default packages
- [refactoring] Update default error pages



## 0.12.1 / 2012-09-06

- [bug fix] Remove useless console.log



## 0.12.0 / 2012-09-06

- [new feature] Add database migration tool
- [update packages] mongoose->3.1.1
- [bug fix] Build assets does not replace changed file



## 0.11.5 / 2012-09-03

- [update packages] mongoose->3.1.0, aws2js->0.7.4
- [bug fix] Typo `locals`->`locales`



## 0.11.4 / 2012-08-28

- [bug fix] Compile empty assets



## 0.11.3 / 2012-08-28

- [bug fix] Make `coke console` work with new mongoose 3.x



## 0.11.2 / 2012-08-28

- [refactoring] Exports `mongoose connection db` object to utils



## 0.11.1 / 2012-08-28

- [bug fix] Assign model hooks



## 0.11.0 / 2012-08-27

- [refactoring] Wrap mongoose to `Model`



## 0.10.4 / 2012-08-24

- [bug fix] Array length check on assets building
- [update packages] mongoose->3.0.3, zombie->1.4.1



## 0.10.3 / 2012-08-22

- [bug fix] Ruten asset hosts



## 0.10.2 / 2012-08-22

- [bug fix] Render empty assets on production mode
- [new feature] Add headers to assets while upload to s3



## 0.10.1 / 2012-08-21

- [bug fix] Assets helpers format



## 0.10.0 / 2012-08-19

- [new feature] Add default server port and host to configs
- [new feature] Take `PORT` argument from command line
- [new feature] Auto upload to s3
- [update packages] inflection->1.2.3, js-yaml->1.0.2, should->1.1.0, moment->1.7.0, mongoose->3.0.2, connect-mongodb->1.1.5, resig-class->node.class, +aws2js




## 0.9.9 / 2012-07-23

- [update packages] inflection->1.2.2, node.flow->1.1.3, node.packer->1.0.0, rmdir->1.0.0, thunder->0.1.4
- [refactoring] Use `fs` instead of `path` for node v0.8.x



## 0.9.8 / 2012-07-19

- [update packages] node.flow->1.1.2, mongoose->2.7.2, thunder->0.1.3, should->1.0.0



## 0.9.7 / 2012-07-10

- [bug fix] Trouble finding keys in production assets helper



## 0.9.6 / 2012-07-09

- [bug fix] Typo



## 0.9.5 / 2012-07-09

- [update packages] rmdir->0.0.3, js-yaml->1.0.1, thunder->0.1.1
- [remove packages] mkdirp



## 0.9.4 / 2012-07-02

- [update packages] express->2.5.11, js-yaml->1.0.0
- [bug fix] utils `merge` missing args



## 0.9.3 / 2012-07-02

- [new feature] Add `merge` fn to utils



## 0.9.2 / 2012-06-28

- [refactoring] Runtime compile assets if `assets_version.json` not found



## 0.9.1 / 2012-06-28

- [bug fix] Check existing assets really exist



## 0.9.0 / 2012-06-28

- [new feature] Add `build` command to precompile assets
- [add packages] Add node.packer, rmdirr as dependences
- [remove packages] Remove node.packer, rmdirr from generated project
- [update packages] mongoose->2.7.1, inflection->1.2.1
- [refactoring] Remove `connect` from dependences, add `uid` to utils
- [refactoring] Check new generator for project name



## 0.8.5 / 2012-06-19

- [update packages] express->2.5.10, mongoose->2.6.8



## 0.8.4 / 2012-06-14

- [refactoring] Move files to it's folder
- [refactoring] Move match fn to filter class
- [update packages] cli-color->0.1.7



## 0.8.3 / 2012-06-13

- [refactoring] Modify `utils.typeof` to suit all cases
- [update packages] connect-mongodb->1.1.4, mkdirp->0.3.3, mongoose->2.6.7, zombie->1.3.1



## 0.8.2 / 2012-05-25

- [update packages] mongoose->2.6.5, mkdirp->0.3.2, moment->1.6.2, railway-routes->0.0.7, should->0.6.3, zombie->1.1.5



## 0.8.1 / 2012-04-30

- [bug fix] Typo
- [update packages] mongoose->2.6.1



## 0.8.0 / 2012-04-30

- [refactoring] Rename UTILS.is to UTILS.typeof and returns lowercased string instead



## 0.7.23 / 2012-04-23

- [update packages] connect->1.8.7
- [refactoring] Use `moment` instead of `dateformat`



## 0.7.22 / 2012-04-22

- [refactoring] Make LOG.debug works in none-request method
- [update packages] mongoose->2.6.0, should->0.6.1, zombie->0.12.15



## 0.7.21 / 2012-04-18

- [bug fix] Log only 4xx & 50x errors was overwritten in v0.7.19



## 0.7.20 / 2012-04-17

- [refactoring] Add request start time to `req`



## 0.7.19 / 2012-04-17

- [bug fix] `undefined` res in debug logger



## 0.7.18 / 2012-04-17

- [refactoring] Log only 4xx & 50x errors
- [update packages] mongoose->2.5.14



## 0.7.17 / 2012-04-16

- [refactoring] Log not only 500 errors



## 0.7.16 / 2012-04-13

- [refactoring] Set global view dir variable



## 0.7.15 / 2012-04-13

- [bug fix] Cli console empty db name



## 0.7.14 / 2012-04-12

- [bug fix] Wrong format in generator templates
- [refactoring] Reorder middlewares to make logger works right
- [update packages] express->2.5.9, railway-routes->0.0.6



## 0.7.13 / 2012-04-12

- [bug fix] Wrong updated_at timestamp at create
- [refactoring] Remove request and response. use logger instead



## 0.7.12 / 2012-04-11

- [bug fix] Auto add updated_at for models



## 0.7.11 / 2012-04-11

- [refactoring] Code generator regex miss match
- [refactoring] More detail on help cli tool



## 0.7.10 / 2012-04-06

- [bug fix] Miss requiring `fs` module in logger



## 0.7.9 / 2012-04-02

- [bug fix] Always true on `before` & `after` filter with no `only` | `except` pass in



## 0.7.8 / 2012-03-31

- [bug fix] Throw an error when `mongoose` is unable to connect to the database
- [bug fix] Add auth for connect-mongo session
- [refactoring] Remove `utils.global_err`. We simply do not output useless info on error log
- [refactoring] Reorder middlewares



## 0.7.7 / 2012-03-31

- [bug fix] `fs` package missing in model.js
- [bug fix] Property `regex` missing in model.js



## 0.7.6 / 2012-03-31

- [refactoring] Move model regex to utils
- [refactoring] Set configs as global object



## 0.7.5 / 2012-03-31

- [bug fix] Fix typo in model.js config.localhost -> config.host



## 0.7.4 / 2012-03-31

- [update packages] node.flow->1.1.1
- [bug fix] Replace appname on doc/README.md



## 0.7.3 / 2012-03-30

- [bug fix] Throw error with illegal characters in database name



## 0.7.2 / 2012-03-30

- [refactoring] Move fliter and stack class to controller_bridge dir
- [update packages] connect->1.8.5, inflection->1.1.1, railway-routes->0.0.5, mongoose->2.5.13
- [bug fix] Controller context was set to global



## 0.7.1 / 2012-03-12

- [bug fix] Use new syntax for controler generator



## 0.7.0 / 2012-03-12

- [new feature] Controller before and after filters
- [new feature] Add `resig class` as project dependency
- [bug fix] Wrong format of global error handler logger syntax



## 0.6.0 / 2012-03-09

- [new feature] Mongoose command line console
- [bug fix] Move dependencies into exports block for cli routes



## 0.5.0 / 2012-03-07

- [new feature] Add `sitemap` generator as project dependency
- [refactoring] Model, view, routes generators regex should pretify syntax



## 0.4.2 / 2012-03-07

- [bug fix] Model, view, routes generators regex should catch all possiable syntax



## 0.4.1 / 2012-03-07

- [refactoring] Make generator syntax more compatible



## 0.4.0 / 2012-03-07

- [new feature] Add `Array` and `ObjectId` as model generator format type



## 0.3.9 / 2012-03-07

- [bug fix] Mongodb does not take `.` in database name
- [bug fix] Replace `COKE` with custom app name in readme
- [docs] Add index



## 0.3.8 / 2012-03-01

- [update packages] mongoose->2.5.9, js-yaml->0.3.7



## 0.3.7 / 2012-03-01

- [refactoring] Use __defineGetter__ directly instead of in a loop
- [refactoring] Change term params to body in logger



## 0.3.6 / 2012-02-17

- [update packages] Add `should` and `zombie` as devDependencies



## 0.3.5 / 2012-02-16

- [refactoring] Use __defineGetter__ to prevent global vars to be overwritten



## 0.3.4 / 2012-02-16

- [bug fix] Wrong generator templates dir



## 0.3.3 / 2012-02-16

- [update packages] thunder->0.0.2
- [refactoring] Move generator templates inside generator dir



## 0.3.2 / 2012-02-15

- [refactoring] Remove useless generator templates
- [refactoring] Use Object.keys instead of for in loop



## 0.3.1 / 2012-02-15

- [refactoring] Remove useless `return` in generators
- [new feature] Add logging pid for logger module



## 0.3.0 / 2012-02-14

- [new feature] Cluster support



## 0.2.0 / 2012-02-14

- [new feature] Add libs that can be run right after server start
- [update packages] node.flow->1.1.0
- [refactoring] Logging before require core module



## 0.1.3 / 2012-02-13

- [bug fix] Typo in assets.yml config file
- [refactoring] Server start flow control
- [refactoring] Check libs length before calling
- [refactoring] Rename read to callback, move callback out of the if statement
- [update packages] inflection->1.1.0, node.flow->0.1.0



## 0.1.2 / 2012-02-10

- [bug fix] Correct the version number
- [refactoring] Read package.json for getting the version instead of hard-coded in the index.js



## 0.1.1 / 2012-02-10

- [update packages] express->2.5.8, mongoose->2.5.7



## 0.1.0 / 2012-02-10

- [refactoring] Generators exit behavior refactoring
- [new feature] Automatically add 'required' and 'index' the the first field of a collection
- [bug fix] New generator generate err400.html instead of err404.html



## 0.0.4 / 2012-02-08

- [bug fix] Update coke version of package.json in code generator template



## 0.0.3 / 2012-02-08

- [bug fix] Add connect as dependency
- [bug fix] Update coke version of package.json in code generator template



## 0.0.2 / 2012-02-08

- [new feature] Add CLI tools. Including version, help, routes, server and generators



## 0.0.1 / 2012-01-18

- Initial release
