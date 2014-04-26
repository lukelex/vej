window.vej.collection = function collection( name, engine ){
  var basePath = "/" + name;

  var rsc = function( id ){
    return window.vej.member( id, basePath, engine );
  };

  var route = window.vej.route( basePath, engine );

  rsc.all = function all( data ){
    return route.act( "get", data);
  };

  rsc.create = function create( data ){
    return route.act( "post", data );
  };

  return rsc;
};
