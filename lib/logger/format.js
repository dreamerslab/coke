module.exports = {
  ms : function ( time ){
    return time + 'ms';
  },

  convert_content : function( formatter ){
    var $title = formatter.title;
    var $desc  = formatter.desc;
    var json   = formatter.json;

    return function ( data, sequence ){
      var ret = '';

      sequence.forEach( function ( field ){
        var title, content;

        if( typeof field === 'object' ){
          title = Object.keys( field )[ 0 ];
          var convert = field[ title ];

          content = data[ title ];
          if( !content ) return;

          content = convert( content );
        }else{
          title = field;
          content = data[ title ];
          if( !content ) return;

          if( typeof content === 'object' ){
            content = json( content );
          }
        }

        var color_title = $title( title );
        var desc = $desc( content );
        ret = ret + color_title + desc + '\n';
      });

      return ret;
    };
  }
};

