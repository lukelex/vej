(function( vej ){
  "use strict";

  function route( path, engine ){
    function run( id, spec, data ){
      spec.path = path.replace( ":id", id );
      return vej.request( spec, data, engine );
    };

    return {
      act: function act( id, method, data ){
        return run( id, { method: method }, data || {} );
      }
    };
  };

  vej.route = route;
})( window.vej );
