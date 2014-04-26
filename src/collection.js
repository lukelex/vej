window.vej.collection = function collection( name, engine ){
  var rsc = function( id ){
    rsc.member = window.vej.member( id, rsc.$basePath, engine );
    return rsc.member;
  };

  rsc.$basePath = "/" + name;

  var route = window.vej.route( rsc.$basePath, engine );

  rsc.all = function all( data ){
    return route.act( "get", data );
  };

  rsc.create = function create( data ){
    return route.act( "post", data );
  };

  return rsc;
};
