window.vej.request = function request( spec, engine ){
  return engine[ spec.method ]( spec.path );
};
