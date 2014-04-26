window.vej.resource = function resource( name, engine, context ){
  var rsc = window.vej.collection( name, engine );

  if ( !!context ){
    var obj = {
      get: function get( name ){
        var newPath = rsc.basePath + "/" + name;
        var route = window.vej.route( newPath, engine );
        rsc[ name ] = function( data ){
          return route.act( "get", data );
        };
      },
      post: function post( name ){
        var newPath = rsc.basePath + "/" + name;
        var route = window.vej.route( newPath, engine );
        rsc[ name ] = function( data ){
          return route.act( "post", data );
        };
      }
    }

    context.call(obj);
  }

  return rsc;
};
