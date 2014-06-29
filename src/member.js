(function( vej ){
  vej.member = function member( id, path, engine, config ){
    var basePath = path + "/" + id;

    var member = {
      $basePath: basePath,
      route: vej.route( basePath, engine ),
    };

    if ( config.allow( "detail" ) ) {
      member.detail = function detail( data ){
        return this.route.act( "get", data );
      };
    }

    if ( config.allow( "remove" ) ) {
      member.remove = function remove( data ){
        return this.route.act( "delete", data );
      };
    }

    if ( config.allow( "update" ) ) {
      member.update = function update( data ){
        return this.route.act( "patch", data );
      };
    }

    return member;
  };
})( window.vej );
