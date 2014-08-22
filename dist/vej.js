// ==========================================================================
// Project:   Vej.js - Declarative http requests
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/vej/blob/master/LICENSE
// ==========================================================================

// Version: 0.5.0 | From: 22-8-2014

(function( window ){
  "use strict";

  window.vej = {};
})( window );

(function( vej ){
  "use strict";

  function actionBuilder( rsc, engine ){
    return {
      get: function get( name ){
        buildAction( "get", name, rsc, engine );
      },
      post: function post( name ){
        buildAction( "post", name, rsc, engine );
      },
      remove: function remove( name ){
        buildAction( "delete", name, rsc, engine );
      },
      patch: function patch( name ){
        buildAction( "patch", name, rsc, engine );
      }
    };
  }

  function buildAction( method, name, rsc, engine ){
    var newPath = rsc.$basePath + "/" + name;
    var route = vej.route( newPath, engine );
    rsc[ name ] = function( data ){
      return route.act( rsc.$id, method, data );
    };
  }

  vej.actionBuilder = actionBuilder;
})( window.vej );

(function( vej ){
  "use strict";

  function resource( name, engine, config, context ){
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
      context.call({
        collection: vej.actionBuilder( rsc, engine ),
        member: vej.actionBuilder( rsc(":id"), engine )
      });
    }

    return rsc;
  };

  function is( obj, type ){
    return obj && {}.toString.call(obj) === "[object " + type + "]";
  }

  vej.resource = resource;
})( window.vej );

(function( vej ){
  "use strict";

  function collection( name, engine, config ){
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

  vej.collection = collection;
})( window.vej );

(function( vej ){
  "use strict";

  function member( basePath, engine, config ){
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

  vej.member = member;
})( window.vej );

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

(function( vej, Promise ){
  "use strict";

  function request( spec, data, engine ){
    return new Promise(function( resolve, reject ){
      engine[ spec.method ]( spec.path, data, {
        resolve: resolve, reject: reject
      });
    });
  };

  vej.request = request;
})( window.vej, window.Promise );

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
