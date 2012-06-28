module.exports = function ( express, app, middleware ){
  app.configure( function (){
    app.register( '.html', require( 'thunder' ));
    app.set( 'view engine', 'html' );
    app.set( 'views', VIEW_DIR );
    app.set( 'view options', {
      layout : 'layouts/default'
    });
    app.use( express.favicon( PUB_DIR + 'favicon.ico', {
      maxAge : 0
    }));
    app.use( express.static( PUB_DIR ));
    app.use( express.cookieParser());
    app.use( middleware.session( express ));
    app.use( express.bodyParser());
    app.use( middleware.logger );
    app.use( middleware.csrf( app, express ));
    app.use( express.methodOverride());
    app.use( middleware.passport());
    app.use( app.router );
    app.use( express.errorHandler({
      dumpExceptions : true,
      showStack : true
    }));
  });
};