(function( vej,jQuery, Zepto, Ajax ){
  "use strict";

  vej.proxies = {
    jQuery: {
      // http://api.jquery.com/jquery.ajax/
      get: function( path, data, promise ){
        return jQuery.ajax(
          jQueryshConfigFor( "GET", path, data, promise )
        );
      },
      post: function( path, data, promise ){
        return jQuery.ajax(
          jQueryshConfigFor( "POST", path, data, promise )
        );
      },
      delete: function( path, data, promise ){
        return jQuery.ajax(
          jQueryshConfigFor( "DELETE", path, data, promise )
        );
      },
      put: function( path, data, promise ){
        return jQuery.ajax(
          jQueryshConfigFor( "PUT", path, data, promise )
        );
      },
      patch: function( path, data, promise ){
        return jQuery.ajax(
          jQueryshConfigFor( "PATCH", path, data, promise )
        );
      }
    },
    Zepto: {
      // https://github.com/SimonWaldherr/majaX.js
      get: function( path, data, promise ){
        return Zepto.ajax(
          jQueryshConfigFor( "GET", path, data, promise )
        );
      },
      post: function( path, data, promise ){
        return Zepto.ajax(
          jQueryshConfigFor( "POST", path, data, promise )
        );
      },
      delete: function( path, data, promise ){
        return Zepto.ajax(
          jQueryshConfigFor( "DELETE", path, data, promise )
        );
      },
      put: function( path, data, promise ){
        return Zepto.ajax(
          jQueryshConfigFor( "PUT", path, data, promise )
        );
      },
      patch: function( path, data, promise ){
        return Zepto.ajax(
          jQueryshConfigFor( "PATCH", path, data, promise )
        );
      }
    },
    Prototype: (function(){
      // http://prototypejs.org/learn/introduction-to-ajax
      function requestFor( method, data, promise ){
        return {
          method: method,
          parameters: data,
          onSuccess: function onSuccess(){
            promise.resolve.apply( {}, arguments )
          },
          onFailure: function onSuccess(){
            promise.resolve.apply( {}, arguments )
          }
        }
      }

      return {
        get: function( path, data, promise ){
          return new Ajax.Request( path, requestFor( "GET", data, promise ) );
        },
        post: function( path, data, promise ){
          return new Ajax.Request( path, requestFor( "POST", data, promise ) );
        },
        delete: function( path, data, promise ){
          return new Ajax.Request( path, requestFor( "DELETE", data, promise ) );
        },
        put: function( path, data, promise ){
          return new Ajax.Request( path, requestFor( "PUT", data, promise ) );
        },
        patch: function( path, data, promise ){
          return new Ajax.Request( path, requestFor( "PATCH", data, promise ) );
        }
      };
    })()
  };

  function jQueryshConfigFor( type, path, data, promise ){
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
})( window.vej, window.jQuery, window.Zepto, window.Ajax );
