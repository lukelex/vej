(function( vej ){
  vej.resource = function resource( name, engine, config, context ){
    context = is("Function", config) ? config : context;
    config = is("Object", config) ? config : {};

    config.allow = function allow( action, config ){
      if ( !this.only ) { return true };

      return ( this.only && this.only.indexOf( action ) !== -1 );
    };

    var rsc = vej.collection( name, engine, config );

    if ( is("Function", context) ){
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

  function is(type, obj){
    return obj && {}.toString.call(obj) === "[object " + type + "]";
  }
})( window.vej );
