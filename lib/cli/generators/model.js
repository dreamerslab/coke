/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var inflection = require( 'inflection' );
var lib        = require( './lib' );

var _ = {

  generate_schema : function ( args, model ){
    var path     = 'db/schema/index.js';
    var code     = fs.readFileSync( lib.path( path, 'schema.js' ), 'utf8' );
    var tmp_code = [ '\n    ' + model + ' : new Schema({' ];
    var i        = 0;

    args.forEach( function ( arg ){
      var tmp    = lib.valid_model_prop_name( arg ).split( ':' );
      var prop   = tmp[ 0 ];
      var format = lib.format( tmp[ 1 ]);
      var extra  = i === 0 ? ', required : true, index : true' : '';

      tmp_code.push( '      ' + prop + ' : { type : ' + format + extra + ' },' );
      i++;
    });

    tmp_code.push( '      created_at : { type : Number, \'default\' : Date.now },' );
    tmp_code.push( '      updated_at : { type : Number }' );
    tmp_code.push( '    }),' );
    tmp_code = tmp_code.join( '\n' );
    // we might not need this anymore since we add the updated_at at the last with no comma
    tmp_code = tmp_code.replace( /\}(\n|\r|\r\n|\t+|\s+|),(\n|\r|\r\n|\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\)/g, '}\n  })' );
    code     = code.replace( /var(\n|\r|\r\n|\t+|\s+)Models(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|){(\t+|\s+|)/, 'var Models = {\n' + tmp_code + '\n\n    ' );
    code     = code.replace( /(\t+|\s+|)\}\),(\n|\r|\r\n|\t+|\s+|)\}(\n|\r|\r\n|\t+|\s+|)\;/g, '\n    })\n  };' );
    // write file
    lib.create_file_f( path, code );
  },

  generate_model : function ( args, model, scaffold ){
    var singular = inflection.singularize( inflection.tableize( model ));
    var code     = [ 'module.exports = {\n' ];

    if( scaffold ){
      code.push( '  statics : {\n' );
      code.push( '    create_or_update : function ( ' + singular + ', props, callback ){' );

      args.forEach( function ( arg ){
        var tmp    = lib.valid_model_prop_name( arg ).split( ':' );
        var prop   = tmp[ 0 ];

        code.push( '      ' + singular + '.' + prop + ' = props.' + prop + ';' );
      });

      code.push( '      ' + singular + '.save( callback );' );
      code.push( '    }' );
      code.push( '  }' );
    }

    code.push( '};\n' );

    code = code.join( '\n' );

    lib.create_file( 'app/models/' + model + '.js', code );
  }
};



module.exports = {
  generate : function ( args, model, scaffold ){
    _.generate_schema( args, model );
    _.generate_model( args, model, scaffold );
  }
};