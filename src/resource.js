window.vej.resource = function resource( name, engine, context ){
  var rsc = window.vej.collection( name, engine );

  if ( !!context ){
    function collectionAction( method, name ){
      var newPath = rsc.$basePath + "/" + name;
      var route = window.vej.route( newPath, engine );
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
      }
    });
  }

  return rsc;
};
