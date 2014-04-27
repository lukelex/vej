// ==========================================================================
// Project:   Vej.js - Declarative http requests
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/vej/blob/master/LICENSE
// ==========================================================================

// Version: 0.1.0 | From: 27-04-2014

window.vej = {};

window.vej.resource = function resource( name, engine, context ){
  var rsc = window.vej.collection( name, engine );

  if ( !!context ){
    function collectionAction( method, name ){
      var newPath = rsc.$basePath + "/" + name;
      var route = window.vej.route( newPath, engine );
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

window.vej.collection = function collection( name, engine ){
  var rsc = function( id ){
    rsc.member = window.vej.member( id, rsc.$basePath, engine );
    return rsc.member;
  };

  rsc.$basePath = "/" + name;

  var route = window.vej.route( rsc.$basePath, engine );

  rsc.all = function all( data ){
    return route.act( "get", data );
  };

  rsc.create = function create( data ){
    return route.act( "post", data );
  };

  return rsc;
};

window.vej.member = function member( id, path, engine ){
  var basePath = path + "/" + id

  return {
    $basePath: basePath,
    route: window.vej.route( basePath, engine ),
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
}

window.vej.route = function route( path, engine ){
  function run( spec, data ){
    spec.path = path;
    return window.vej.request( spec, data, engine );
  };

  return {
    act: function( method, data ){
      return run( { method: method }, { data: data } );
    }
  };
};

window.vej.request = function request( spec, data, engine ){
  return engine[ spec.method ]( spec.path, data );
};

window.vej.proxies = {
  httpjs: {
    // https://github.com/nauman1225/http.js
    get: function(path, data){
      return new Http.Get(path, true).start();
    },
    post: function(path, data){
      return new Http.Post(path, data, true).start();
    }
  }
};
