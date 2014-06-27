(function( vej ){
  vej.resource = function resource( name, engine, context ){
    var rsc = vej.collection( name, engine );

    if ( !!context ){
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
        }
      });
    }

    return rsc;
  };
})( window.vej );
