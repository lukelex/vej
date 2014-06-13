(function( vej ){
  vej.proxies = {
    httpjs: {
      // https://github.com/nauman1225/http.js
      get: function get( path, data ){
        return new Http.Get( path, data, false );
      },
      post: function post( path, data ){
        return new Http.Post( path, data, false );
      },
      delete: function deletE( path, data ){
        return new Http.Delete( path, data, false );
      },
      patch: function patch( path, data ){
        return new Http.Put( path, data, false );
      }
    }
  };
})( window.vej );
