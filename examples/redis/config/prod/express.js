module.exports = function ( express, app, middleware ){
  app.configure( function (){
    app.register( '.html', require( 'thunder' ));
    app.set( 'view engine', 'html' );
    app.set( 'views', VIEW_DIR );
    app.set( 'view options', {
      layout : 'layouts/default',
      compress : true
    });
    app.use( express.cookieParser());
    app.use( middleware.session( express ));
    app.use( express.bodyParser());
    app.use( middleware.logger );
    app.use( middleware.csrf( app, express ));
    app.use( express.methodOverride());
    app.use( app.router );
    app.use( middleware.err404 );
    app.use( middleware.err500 );
    app.use( express.errorHandler());
  });
};