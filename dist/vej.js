// ==========================================================================
// Project:   Vej.js - Declarative http requests
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/vej/blob/master/LICENSE
// ==========================================================================

// Version: 0.1.0 | From: 13-6-2014

(function( window ){
  window.vej = {};
})( window );

(function( vej ){
  vej.resource = function resource( name, engine, context ){
    var rsc = vej.collection( name, engine );

    if ( !!context ){
      function collectionAction( method, name ){
        var newPath = rsc.$basePath + "/" + name;
        var route = vej.route( newPath, engine );
        rsc[ name ] = function( data ){
          return route.act( method, data );
        };
      }

      context.call({}, {
        get: function get( name ){
          collectionAction( "get", name );
        },
        post: function post( name ){
          collectionAction( "post", name );
        }
      });
    }

    return rsc;
  };
})( window.vej );

(function( vej ){
  vej.collection = function collection( name, engine ){
    var rsc = function( id ){
      rsc.member = vej.member( id, rsc.$basePath, engine );
      return rsc.member;
    };

    rsc.$basePath = "/" + name;

    var route = vej.route( rsc.$basePath, engine );

    rsc.all = function all( data ){
      return route.act( "get", data );
    };

    rsc.create = function create( data ){
      return route.act( "post", data );
    };

    return rsc;
  };
})( window.vej );

(function( vej ){
  vej.member = function member( id, path, engine ){
    var basePath = path + "/" + id;

    return {
      $basePath: basePath,
      route: vej.route( basePath, engine ),
      detail: function( data ){
        return this.route.act( "get", data );
      },
      delete: function( data ){
        return this.route.act( "delete", data );
      },
      update: function( data ){
        return this.route.act( "patch", data );
      }
    };
  };
})( window.vej );

(function( vej ){
  vej.route = function route( path, engine ){
    function run( spec, data ){
      spec.path = path;
      return vej.request( spec, data, engine );
    };

    return {
      act: function( method, data ){
        return run( { method: method }, data || {} );
      }
    };
  };
})( window.vej );

(function( vej ){
  vej.request = function request( spec, data, engine ){
    return new Promise(function (resolve, reject) {
      engine[ spec.method ]( spec.path, data, {
        resolve: resolve, reject: reject
      });
    });
  };
})( window.vej );

(function( vej ){
  vej.proxies = {
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
          {method: "POST", url: path, data: data},
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      },
      delete: function( path, data, p ){
        return majaX(
          {method: "DELETE", url: path, data: data},
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      },
      patch: function( path, data, p ){
        return majaX(
          {method: "PATCH", url: path, data: data},
          function( data )      { p.resolve( data ); },
          function( fail, ajax ){ p.reject( ajax ); }
        );
      }
    }
  };
})( window.vej );
