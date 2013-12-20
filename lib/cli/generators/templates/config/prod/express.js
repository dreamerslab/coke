module.exports = function ( express, app, middleware ){
  app.configure( function (){
    app.engine( 'html', require( 'express-thunder' ));
    app.set( 'view engine', 'html' );
    app.set( 'views', VIEW_DIR );
    app.locals({
      _layoutFile : '/layouts/default',
      cache       : true,
      compress    : true
    });
    app.use( express.json());
    app.use( express.urlencoded());
    app.use( express.multipart());
    app.use( express.cookieParser());
    app.use( middleware.logger );
    app.use( middleware.session( express ));
    app.use( middleware.flash());
    app.use( middleware.csrf( express ));
    app.use( express.methodOverride());
    app.use( middleware.dynamic_helpers );
    app.use( app.router );
    app.use( middleware.err404 );
    app.use( middleware.err500 );
    app.use( express.errorHandler());
  });
};
