(function( vej ){
  vej.request = function request( spec, data, engine ){
    return engine[ spec.method ]( spec.path, data );
  };
})( window.vej );
