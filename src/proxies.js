(function( vej, majaX, jQuery ){
  "use strict";

  vej.proxies = {
    jQuery: (function(){
      function requestConfigFor( type, path, data, promise ){
        return {
          type: type,
          url: path,
          data: data,
          success: function(){
            promise.resolve.apply( {}, arguments );
          },
          error: function(){
            promise.reject.apply( {}, arguments );
          }
        }
      }

      return {
        get: function( path, data, promise ){
          return jQuery.ajax(
            requestConfigFor( "GET", path, data, promise )
          );
        },
        post: function( path, data, promise ){
          return jQuery.ajax(
            requestConfigFor( "POST", path, data, promise )
          );
        },
        delete: function( path, data, promise ){
          return jQuery.ajax(
            requestConfigFor( "DELETE", path, data, promise )
          );
        },
        patch: function( path, data, promise ){
          return jQuery.ajax(
            requestConfigFor( "PATCH", path, data, promise )
          );
        }
      }
    })(),
    majaX: {
      // https://github.com/SimonWaldherr/majaX.js
      get: function( path, data, p ){
        return majaX(
          { method: "GET", url: path, data: data },
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      },
      post: function( path, data, p ){
        return majaX(
          { method: "POST", url: path, data: data },
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      },
      delete: function( path, data, p ){
        return majaX(
          { method: "DELETE", url: path, data: data },
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      },
      patch: function( path, data, p ){
        return majaX(
          { method: "PATCH", url: path, data: data },
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      }
    }
  };
})( window.vej, window.majaX, window.jQuery );
