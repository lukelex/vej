(function( vej, majaX, jQuery ){
  "use strict";

  vej.proxies = {
    jQuery: {
      get: function( path, data, p ){
        return jQuery.ajax({
          type: "GET",
          url: path,
          data: data,
          success: function(){ p.resolve.apply( {}, arguments ); },
          error:   function(){ p.reject.apply( {}, arguments ); }
        });
      },
      post: function( path, data, p ){
        return jQuery.ajax({
          type: "POST",
          url: path,
          data: data ,
          success: function(){ p.resolve.apply( {}, arguments ); },
          error:   function(){ p.reject.apply( {}, arguments ); }
        });
      },
      delete: function( path, data, p ){
        return jQuery.ajax({
          type: "DELETE",
          url: path,
          data: data,
          success: function(){ p.resolve.apply( {}, arguments ); },
          error:   function(){ p.reject.apply( {}, arguments ); }
        });
      },
      patch: function( path, data, p ){
        return jQuery.ajax({
          type: "PATCH",
          url: path,
          data: data,
          success: function(){ p.resolve.apply( {}, arguments ); },
          error:   function(){ p.reject.apply( {}, arguments ); }
        });
      }
    },
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
