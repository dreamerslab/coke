# COKE

“ COKE is a node.js MVC framework base on [Express](http://expressjs.com/). It does not add too many magic, instead it provides a clean and well structured project bootstrap. ”



## Features

  - MVC structure.
  - [Mongoose](http://mongoosejs.com/) as ODM (mongodb), supports validation.
  - Lightening fast template parsing with [thunder](https://github.com/dreamerslab/thunder). It renders over a million pages within a second. However it can be replaced with any express compatible ones if it does not fit your need.
  - RESTful routing, supports namespace and nested resource. Thanks to [RailwayJS](http://railwayjs.com/).
  - Assets management (something like assets pipeline in rails). COKE uses a YAML file to manage al your assets. You can group them, specify which assets to be used in the action view. On production they will be combined and minified with a version number at the end.
  - Middleware and 3rd party lib support, which means all the [express](http://expressjs.com/) and [connect](http://www.senchalabs.org/connect/) middlewares can be used directly/
  - Comprehensive logger for debugging.
  - Powerful generators for project prototyping.
  - Cluster support.
  - Socket.io compatible.



## Requires

  - node >= 0.6.x
  - npm >= 1.0.x
  - mongodb >= 2.0.X
  - Java jre6 for [YUI-compressor](http://developer.yahoo.com/yui/compressor/) which is used on packing assets
  - python >= 2.6 for reading YAML files
  - packages
    - see packages.json



## Installation

  - Set up node.js development enviroment, on [Mac](http://dreamerslab.com/blog/en/how-to-setup-a-node-js-development-environment-on-mac-osx-lion/) or [Ubuntu](http://dreamerslab.com/blog/en/how-to-setup-a-node-js-development-environment-on-ubuntu-11-04/)

  - Ubuntu install java jre6

<!---->

    $ sudo apt-get install python-software-properties
    $ sudo add-apt-repository ppa:ferramroberto/java
    $ sudo apt-get update
    $ sudo apt-get install sun-java6-jre

  - Install through npm

<!---->

    npm install coke -g



## Quick start

    coke new blog && cd blog
    npm install -l
    coke g scaffold posts title content is_public:bool
    coke s
    open http://127.0.0.1:4000



## Todo

  - Add docs
  - Add tests
  - Add examples



## License

(The MIT License)

Copyright (c) 2012 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.