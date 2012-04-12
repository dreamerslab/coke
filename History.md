## 0.7.14 /

  - [bug fix] Wrong format in generator templates



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