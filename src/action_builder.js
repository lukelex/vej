(function( vej ){
  function actionBuilder( rsc, engine ){
    return {
      get: function get( name ){
        buildAction( "get", name, rsc, engine );
      },
      post: function post( name ){
        buildAction( "post", name, rsc, engine );
      },
      remove: function remove( name ){
        buildAction( "delete", name, rsc, engine );
      },
      patch: function patch( name ){
        buildAction( "patch", name, rsc, engine );
      }
    };
  }

  function buildAction( method, name, rsc, engine ){
    var newPath = rsc.$basePath + "/" + name;
    var route = vej.route( newPath, engine );
    rsc[ name ] = function( data ){
      return route.act( rsc.$id, method, data );
    };
  }

  vej.actionBuilder = actionBuilder;
})( window.vej );
