(function( vej ){
  vej.member = function member( id, path, engine ){
    var basePath = path + "/" + id;

    return {
      $basePath: basePath,
      route: vej.route( basePath, engine ),
      detail: function detail( data ){
        return this.route.act( "get", data );
      },
      remove: function remove( data ){
        return this.route.act( "delete", data );
      },
      update: function update( data ){
        return this.route.act( "patch", data );
      }
    };
  };
})( window.vej );
