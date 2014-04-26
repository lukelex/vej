window.vej.member = function member( id, path, engine ){
  var basePath = path + "/" + id;

  var route = window.vej.route( basePath, engine );

  return {
    detail: function( data ){
      return route.act( "get", data );
    },
    delete: function( data ){
      return route.act( "delete", data );
    },
    update: function( data ){
      return route.act( "patch", data );
    }
  };
}
