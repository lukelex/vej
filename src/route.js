window.vej.route = function route( path, engine ){
  function run( spec ){
    spec.path = path;
    return window.vej.request( spec, engine );
  } var route = run;

  route.act = function( method ){
    return run( { method: method } );
  };

  return route;
};
