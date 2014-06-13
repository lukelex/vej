(function( vej ){
  vej.route = function route( path, engine ){
    function run( spec, data ){
      spec.path = path;
      return vej.request( spec, data, engine );
    };

    return {
      act: function( method, data ){
        return run( { method: method }, { data: data } );
      }
    };
  };
})( window.vej );
