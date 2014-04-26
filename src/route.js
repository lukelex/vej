window.vej.route = function route( path, engine ){
  function run( spec, data ){
    spec.path = path;
    return window.vej.request( spec, data, engine );
  } var route = run;

  route.act = function( method, data ){
    return run( { method: method }, { data: data } );
  };

  return route;
};
