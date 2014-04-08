/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var inflection = require( 'inflection' );
var lib        = require( './lib' );

var _ = {

  _html_show_partial : function ( code, singular, title, action ){
    code.push( '  <div class="form-row">' );
    code.push( '    <label class="form-title" >' + title + ' : </label>' );
    code.push( '    <label ><?= it.' + singular + '.' + action + ' ?></label>' );
    code.push( '  </div>' );

    return code;
  },

  generate_html_show : function ( args, singular, controller, model, view_path ){
    var self = this;
    var code = [ '<? it.styles.push( \'scaffold\' ) ?>' ];

    code.push( '<? it.title = \'' + model + ' detail\' ?>' );
    code.push( '<? it.nav_selected = \'' + controller + '\' ?>\n' );
    code.push( '<div id="table">' );
    code = this._html_show_partial( code, singular, 'ID', '_id' );

    args.forEach( function ( arg ){
      var tmp   = lib.valid_model_prop_name( arg ).split( ':' );
      var prop  = tmp[ 0 ];
      var title = inflection.classify( prop );

      code = self._html_show_partial( code, singular, title, prop );
    });

    code = this._html_show_partial( code, singular, 'Created at', 'created_at' );
    code = this._html_show_partial( code, singular, 'Updated at', 'updated_at' );

    code.push( '</div>' );
    code.push( '<a href="/' + controller + '/<?= it.' + singular + '._id ?>/edit">Edit</a> |' );
    code.push( '<a href="/' + controller + '">Back</a>' );

    code = code.join( '\n' );

    lib.create_file( view_path + 'show.html', code );
  },

  generate_html_form : function ( args, singular, controller, view_path ){
    var code = [ '<input type="hidden" name="_csrf" value="<?= it.csrf ?>" />' ];

    args.forEach( function ( arg ){
      var tmp   = lib.valid_model_prop_name( arg ).split( ':' );
      var prop  = tmp[ 0 ];
      var title = inflection.classify( prop );
      var name  = singular + '[' + prop + ']';

      code.push( '<div class="form-row">' );
      code.push( '  <label class="form-title" for="' + name + '">' + title + ' : </label>' );
      code.push( '  <input class="text-input" type="text" name="' + name +
        '" value="<?= it.val( it.' + singular + ', \'' + prop + '\' ) ?>"/>' );
      code.push( '</div>' );
    });

    code = code.join( '\n' );

    lib.create_file( view_path + '_form.html', code );
  },

  generate_html_index : function ( args, singular, controller, splited_controller, dash, sdash, view_path ){
    var code       = [ '<? it.styles.push( \'scaffold\' ) ?>' ];
    var inner_code = [];

    code.push( '<? it.title = \'Listing ' + dash + '\' ?>' );
    code.push( '<? it.nav_selected = \'' + dash + '\' ?>\n' );
    code.push( '<div id="table">' );
    code.push( '  <table>' );
    code.push( '    <thead>' );
    code.push( '      <tr>' );

    args.forEach( function ( arg ){
      var tmp   = lib.valid_model_prop_name( arg ).split( ':' );
      var prop  = tmp[ 0 ];
      var title = inflection.classify( prop );

      code.push( '        <th nowrap="nowrap">' );
      code.push( '          ' + title );
      code.push( '        </th>' );
      inner_code.push( '        <td>' );
      inner_code.push( '          <?= ' + singular + '.' + prop + ' ?>' );
      inner_code.push( '        </td>' );
    });

    inner_code = inner_code.join( '\n' );

    code.push( '        <th></th>' );
    code.push( '        <th></th>' );
    code.push( '        <th></th>' );
    code.push( '      </tr>' );
    code.push( '    </thead>' );
    code.push( '    <tbody>' );
    code.push( '      <? it.' + splited_controller + '.forEach( function ( ' + singular + ' ){ ?>\n' );
    code.push( '      <tr>' );
    code.push( inner_code );
    code.push( '        <td>' );
    code.push( '          <a href="/' + controller + '/<?= ' + singular + '._id ?>">Show</a>' );
    code.push( '        </td>' );
    code.push( '        <td>' );
    code.push( '          <a href="/' + controller + '/<?= ' + singular + '._id ?>/edit">Edit</a>' );
    code.push( '        </td>' );
    code.push( '        <td>' );
    code.push( '          <form action="/' + controller + '/<?= ' + singular + '._id ?>" method="POST" accept-charset="UTF-8" >' );
    code.push( '            <input type="hidden" name="_method" value="delete" />' );
    code.push( '            <input type="hidden" name="_csrf" value="<?= it.csrf ?>" />' );
    code.push( '            <input class="submit-link" type="submit" value="Delete" />' );
    code.push( '          </form>' );
    code.push( '        </td>' );
    code.push( '      </tr>\n' );
    code.push( '      <? }) ?>' );
    code.push( '    </tbody>' );
    code.push( '  </table>' );
    code.push( '</div>' );
    code.push( '<a href="/' + controller + '/new">New ' + sdash + '</a>' );

    code = code.join( '\n' );

    lib.create_file( view_path + 'index.html', code );
  },

  generate_html_nav : function ( controller, splited_controller, dash, model ){
    var path      = 'app/views/common/_nav.html';
    var src       = fs.readFileSync( lib.path( path, 'views/nav.html' ), 'utf8' );

    var code = [];
    var end  = '  </ul>\n</div>';

    code.push( '    <li>' );
    code.push( '      <h3>' );
    code.push( '        <a class="<?= it.selected( \'' + dash + '\', it.nav_selected ) ?>" href="/' +
      controller + '">' + inflection.camelize( dash ) + '</a>' );
    code.push( '      </h3>' );
    code.push( '    </li>' );
    code.push( end );

    code = code.join( '\n' );
    code = src.replace( /(\n|\r|\r\n|\t+|\s+|)<\/ul>(\n|\r|\r\n|\t+|\s+|)<\/div>/, '\n' + code );

    lib.create_file_f( path, code );
  }
};



module.exports = {

  generate : function ( args, controller, splited_controller, model, view_path, regex ){
    var singular = inflection.singularize( splited_controller );
    var dash     = controller.replace( '/', '-' );
    var sdash    = inflection.singularize( dash );

    regex.push( function ( template ){
      return template.replace( /SDASH/g, sdash );
    });

    regex.push( function ( template ){
      return template.replace( /DASH/g, dash );
    });

    // _form.html
    _.generate_html_form( args, singular, controller, view_path );
    // edit.html
    lib.create_file_by_template( view_path + 'edit.html', 'views/edit.html', regex );
    // index.html
    _.generate_html_index( args, singular, controller, splited_controller, dash, sdash, view_path );
    // new.html
    lib.create_file_by_template( view_path + 'new.html', 'views/new.html', regex );
    // show.html
    _.generate_html_show( args, singular, controller, model, view_path );
    // _nav.html
    _.generate_html_nav( controller, splited_controller, dash, model );
    // scaffold.css
    lib.create_file_by_template( 'public/css/scaffold.css', 'public/scaffold.css' );
  }
};
