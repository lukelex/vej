window.vej.member = function member( id, path, engine ){
  var basePath = path + "/" + id

  return {
    $basePath: basePath,
    route: window.vej.route( basePath, engine ),
    detail: function( data ){
      return this.route.act( "get", data );
    },
    delete: function( data ){
      return this.route.act( "delete", data );
    },
    update: function( data ){
      return this.route.act( "patch", data );
    }
  };
}
