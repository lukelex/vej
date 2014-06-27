var collection = require("collection"),
    route = require("route");

modules.exports = function resource( name, engine, context ){
  var rsc = collection( name, engine );

  if ( !!context ){
    function collectionAction( method, name ){
      var newPath = rsc.$basePath + "/" + name;
      var collectionRoute = route( newPath, engine );
      rsc[ name ] = function( data ){
        return collectionRoute.act( method, data );
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
