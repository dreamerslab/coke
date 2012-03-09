module.exports = function (){
  var utils = require( '../utils' );

  utils.is_project_root( function ( current ){
    require( '../global' )( current, function (){
      var local_path = BASE_DIR + 'node_modules/';
      var fs         = require( 'fs' );
      var yaml       = require( local_path + 'js-yaml/index' );
      var source     = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
      var config     = yaml.load( source ).db;
      var path       = BASE_DIR + 'app/models/';
      var files      = fs.readdirSync( path );
      var repl       = require( 'repl' );
      var ctx        = repl.start( 'coke> ' ).context;

      ctx.reload = function (){
        var mongoose = require( local_path + 'mongoose/index' );

        files.forEach( function ( file ){
          if( utils.regex.is_js_file.test( file )){
            var model = file.replace( '.js', '' );

            require( path + file );
            ctx[ model ] = mongoose.model( model );
          }
        });

        var url = 'mongodb://';

        if( config.username && config.username.length > 0 ){
          url += config.username + ':' + config.password + '@';
        }

        url += config.host + ':' + config.port;
        url += '/' + config.db;

        mongoose.connect( url );
      };

      ctx.log = function (){
        console.log( '\n', arguments[ 0 ]);
        // this line of coke took me about 10 fucking hours
        repl.repl.rli.prompt();
      };

      ctx.exit = function (){
        process.exit( 0 );
      };

      process.nextTick( ctx.reload );
    });
  });
};