(function( vej, Promise ){
  "use strict";

  function request( spec, data, engine ){
    return new Promise(function( resolve, reject ){
      engine[ spec.method ]( spec.path, data, {
        resolve: resolve, reject: reject
      });
    });
  };

  vej.request = request;
})( window.vej, window.Promise );
