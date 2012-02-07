var fs         = require( 'fs' );
var inflection = require( 'inflection' );
var lib        = require( './lib' );



var _ = {

  generate_schema : function ( args, model ){
    var path     = 'db/schema.js';
    var code     = fs.readFileSync( lib.path( path, 'schema.js' ), 'utf8' );
    var tmp_code = [ '\n  ' + model + ' : new Schema({' ];

    args.forEach( function ( arg ){
      var tmp    = lib.valid_model_prop_name( arg ).split( ':' );
      var prop   = tmp[ 0 ];
      var format = lib.format( tmp[ 1 ]);

      tmp_code.push( '    ' + prop + ' : { type : ' + format + ' },' );
    });

    tmp_code.push( '    created_at : { type : Number, \'default\' : Date.now },' );
    tmp_code.push( '    updated_at : { type : Number, \'default\' : Date.now }' );
    tmp_code.push( '  }),' );
    tmp_code = tmp_code.join( '\n' );
    // we might not need this anymore since we add the updated_at at the last with no comma
    tmp_code = tmp_code.replace( '},\n  })', '}\n  })' );
    code     = code.replace( 'var Model = {', 'var Model = {\n' + tmp_code );
    code     = code.replace( '  }),\n};', '  })\n};' );
    // write file
    lib.create_file_f( path, code );

    return;
  },

  generate_model : function ( args, model, scaffold ){
    var singular = inflection.singularize( inflection.tableize( model ));
    var code     = [ 'var ' + model + ' = require( BASE_DIR + \'db/schema\' ).' + model + ';\n' ];

    if( scaffold ){
      code.push( model + '.statics = {\n' );
      code.push( '  create_or_update : function ( ' + singular + ', props, callback ){' );

      args.forEach( function ( arg ){
        var tmp    = lib.valid_model_prop_name( arg ).split( ':' );
        var prop   = tmp[ 0 ];

        code.push( '    ' + singular + '.' + prop + ' = props.' + prop + ';' );
      });

      code.push( '    ' + singular + '.save( callback );' );
      code.push( '  }' );
      code.push( '};\n' );
    }

    code.push( 'require( \'mongoose\' ).model( \'' + model + '\', ' + model + ' );' );

    code = code.join( '\n' );

    lib.create_file( 'app/models/' + model + '.js', code );

    return;
  }
};



module.exports = {
  generate : function ( args, model, scaffold ){
    _.generate_schema( args, model );
    _.generate_model( args, model, scaffold );

    return;
  }
};