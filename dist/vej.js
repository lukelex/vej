// ==========================================================================
// Project:   Vej.js - Declarative http requests
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/vej/blob/master/LICENSE
// ==========================================================================

// Version: 0.4.0 | From: 30-7-2014

(function( window ){ window.vej = {}; })( window );

(function( vej ){
  vej.resource = function resource( name, engine, config, context ){
    context = is( config, "Function" ) ? config : context;
    config = is( config, "Object" ) ? config : {};

    config.allow = function allow( action ){
      if ( !this.only && !this.except ) { return true };

      return (
        ( this.only && this.only.indexOf( action ) !== -1 ) ||
        ( this.except && this.except.indexOf( action ) < 0 )
      );
    };

    var rsc = vej.collection( name, engine, config );

    if ( is( context, "Function" ) ){
      context.call({}, {
        collection: vej.actionBuilder( rsc, engine ),
        member: vej.actionBuilder( rsc(":id"), engine )
      });
    }

    return rsc;
  };

  function is( obj, type ){
    return obj && {}.toString.call(obj) === "[object " + type + "]";
  }
})( window.vej );

(function( vej ){
  vej.collection = function collection( name, engine, config ){
    var rsc = function rsc( id ){
      rsc.member.$id = id;
      return rsc.member;
    };

    rsc.$basePath = "/" + name;

    var route = vej.route( rsc.$basePath, engine );

    if ( config.allow( "all" ) ) {
      rsc.all = function all( data ){
        return route.act( null, "get", data );
      };
    }

    if ( config.allow( "create" ) ) {
      rsc.create = function create( data ){
        return route.act( null, "post", data );
      };
    }

    rsc.member = vej.member( rsc.$basePath + "/:id", engine, config );

    return rsc;
  };
})( window.vej );

(function( vej ){
  vej.member = function member( basePath, engine, config ){
    var member = {
      $id: null,
      $basePath: basePath,
      route: vej.route( basePath, engine )
    };

    if ( config.allow( "detail" ) ) {
      member.detail = function detail( data ){
        return this.route.act( member.$id, "get", data );
      };
    }

    if ( config.allow( "remove" ) ) {
      member.remove = function remove( data ){
        return this.route.act( member.$id, "delete", data );
      };
    }

    if ( config.allow( "update" ) ) {
      member.update = function update( data ){
        return this.route.act( member.$id, "patch", data );
      };
    }

    return member;
  };
})( window.vej );

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

(function( vej, Promise ){
  vej.request = function request( spec, data, engine ){
    return new Promise(function( resolve, reject ){
      engine[ spec.method ]( spec.path, data, {
        resolve: resolve, reject: reject
      });
    });
  };
})( window.vej, window.Promise );

(function( vej, majaX ){
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
})( window.vej, window.majaX );
