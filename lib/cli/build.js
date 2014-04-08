/**
 * Module dependencies.
 * @private
 */
var utils = require( '../utils' );
var build = require( '../assets/build' );

module.exports = function (){

  utils.is_project_root( function ( current ){
    build( current );
  });
};
