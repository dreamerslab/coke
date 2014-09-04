module.exports = function ( app, middleware ){
  app.locals._layoutFile = '/layouts/default';
  app.engine( 'html', require( 'express-thunder' ));
  app.set( 'view engine', 'html' );
  app.set( 'views', VIEW_DIR );
  app.use( middleware.favicon( PUB_DIR + '/favicon.ico', { maxAge : 0 }));
  app.use( middleware.static( PUB_DIR ));
  app.use( middleware.body_parser.json());
  app.use( middleware.body_parser.urlencoded({ extended: true }));
  app.use( middleware.multipart());
  app.use( middleware.cookie_parser( CONF.session.secret ));
  app.use( middleware.logger );
  app.use( middleware.session());
  app.use( middleware.flash());
  app.use( middleware.method_override());
  app.use( middleware.csrf());
  app.use( middleware.dynamic_helpers );
  app.routes();
  app.use( middleware.error_handler({
    dumpExceptions : true,
    showStack      : true
  }));
};
