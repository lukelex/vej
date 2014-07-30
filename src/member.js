(function( vej ){
  vej.member = function member( basePath, engine, config ){
    var member = {
      $id: null,
      $basePath: basePath,
      route: vej.route( basePath, engine )
    };

    if ( config.allow( "detail" ) ) {
      member.detail = function detail( data ){
        return this.route.act( member.$id, "get", data );
      };
    }

    if ( config.allow( "remove" ) ) {
      member.remove = function remove( data ){
        return this.route.act( member.$id, "delete", data );
      };
    }

    if ( config.allow( "update" ) ) {
      member.update = function update( data ){
        return this.route.act( member.$id, "patch", data );
      };
    }

    return member;
  };
})( window.vej );
