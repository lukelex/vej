(function( vej ){
  vej.collection = function collection( name, engine ){
    var rsc = function( id ){
      rsc.member = vej.member( id, rsc.$basePath, engine );
      return rsc.member;
    };

    rsc.$basePath = "/" + name;

    var route = vej.route( rsc.$basePath, engine );

    rsc.all = function all( data ){
      return route.act( "get", data );
    };

    rsc.create = function create( data ){
      return route.act( "post", data );
    };

    return rsc;
  };
})( window.vej );
