(function( vej ){
  vej.resource = function resource( name, engine, config, context ){
    context = is( config, "Function" ) ? config : context;
    config = is( config, "Object" ) ? config : {};

    config.allow = function allow( action ){
      if ( !this.only && !this.except ) { return true };

      return (
        ( this.only && this.only.indexOf( action ) !== -1 ) ||
        ( this.except && this.except.indexOf( action ) < 0 )
      );
    };

    var rsc = vej.collection( name, engine, config );

    if ( is( context, "Function" ) ){
      function collectionAction( method, name ){
        var newPath = rsc.$basePath + "/" + name;
        var route = vej.route( newPath, engine );
        rsc[ name ] = function( data ){
          return route.act( method, data );
        };
      }

      context.call({}, {
        get: function get( name ){
          collectionAction( "get", name );
        },
        post: function post( name ){
          collectionAction( "post", name );
        },
        remove: function remove( name ){
          collectionAction( "delete", name );
        },
        patch: function patch( name ){
          collectionAction( "patch", name );
        }
      });
    }

    return rsc;
  };

  function is( obj, type ){
    return obj && {}.toString.call(obj) === "[object " + type + "]";
  }
})( window.vej );
