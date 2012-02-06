module.exports = function ( express, app, middleware ){
  app.configure( function (){
    app.set( 'views', BASE_DIR + 'app/views' );
    app.set( 'view engine', 'html' );
    app.register( '.html', require( 'thunder' ));
    app.set( 'view options', {
      layout : 'layouts/default',
      compress : true
    });
    app.use( express.cookieParser());
    app.use( middleware.session( express ));
    app.use( express.bodyParser());
    app.use( middleware.csrf( app, express ));
    app.use( middleware.req_log );
    app.use( express.methodOverride());
    app.use( app.router );
    app.use( middleware.err404 );
    app.use( middleware.validation );
    app.use( middleware.err500 );
    app.use( express.errorHandler());
  });
};