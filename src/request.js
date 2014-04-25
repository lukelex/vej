window.vej.request = function request( spec, engine ){
  return function start(){
    return engine[ spec.action ]( spec.path );
  };
};
