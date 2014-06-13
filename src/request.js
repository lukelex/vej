(function( vej ){
  vej.request = function request( spec, data, engine ){
    return new Promise(function (resolve, reject) {
      engine[ spec.method ]( spec.path, data, {
        resolve: resolve, reject: reject
      });
    });
  };
})( window.vej );
