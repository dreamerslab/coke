module.exports = function ( express, app, middleware ){
  app.configure( function (){
    app.engine( 'html', require( 'express-thunder' ));
    app.set( 'view engine', 'html' );
    app.set( 'views', VIEW_DIR );
    app.locals({ _layoutFile : '/layouts/default' });
    app.use( express.favicon( PUB_DIR + '/favicon.ico', { maxAge : 0 }));
    app.use( express.static( PUB_DIR ));
    app.use( express.json());
    app.use( express.urlencoded());
    app.use( express.methodOverride());
    app.use( express.cookieParser());
    app.use( middleware.logger );
    app.use( middleware.session( express ));
    app.use( middleware.flash());
    app.use( middleware.csrf( express ));
    app.use( express.methodOverride());
    app.use( app.router );
    app.use( express.errorHandler({
      dumpExceptions : true,
      showStack      : true
    }));
  });
};
