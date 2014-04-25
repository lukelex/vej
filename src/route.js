window.vej.route = function route( spec, engine ){
  spec.run = function run( params ){
    return window.vej.request( spec, engine )();
  };

  return spec.run;
};
