(function( vej ){
  vej.route = function route( path, engine ){
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
})( window.vej );
