(function( vej ){
  vej.proxies = {
    httpjs: {
      // https://github.com/nauman1225/http.js
      get: function get( path, data ){
        return new Http.Get( path, true ).start();
      },
      post: function post( path, data ){
        return new Http.Post( path, data, true ).start();
      }
    }
  };
})( window.vej );
