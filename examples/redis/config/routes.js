module.exports = function ( map ){
  map.resources( 'blogs' );
  map.get( '/','welcome#index' );
};