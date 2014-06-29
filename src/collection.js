(function( vej ){
  vej.collection = function collection( name, engine, config ){
    var rsc = function rsc( id ){
      rsc.member = vej.member( id, rsc.$basePath, engine, config );
      return rsc.member;
    };

    rsc.$basePath = "/" + name;

    var route = vej.route( rsc.$basePath, engine );

    if ( config.allow( "all" ) ) {
      rsc.all = function all( data ){
        return route.act( "get", data );
      };
    }

    if ( config.allow( "create" ) ) {
      rsc.create = function create( data ){
        return route.act( "post", data );
      };
    }

    return rsc;
  };
})( window.vej );
