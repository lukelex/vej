window.vej.collection = function collection( name, engine ){
  var basePath = "/" + name;

  var rsc = function( id ){
    return window.vej.member( id, basePath, engine );
  };

  var route = window.vej.route( basePath, engine );

  rsc.all = function all(){
    return route.act( "get" );
  };

  rsc.create = function create(){
    return route.act( "post" );
  };

  return rsc;
};
