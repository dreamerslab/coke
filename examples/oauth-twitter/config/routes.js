module.exports = function ( map ){
  map.get( '/','home#index' );

  map.get( 'login', 'sessions#new' );
  map.get( 'login/twitter', 'sessions#create' );
  map.get( 'logout', 'sessions#destroy' );
};