// ==========================================================================
// Project:   Vej.js - Declarative http requests
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/vej/blob/master/LICENSE
// ==========================================================================

// Version: 0.1.0 | From: 26-04-2014

window.vej = {};

window.vej.resource = function resource( name, engine ){
  return window.vej.collection( name, engine );
};

window.vej.collection = function collection( name, engine ){
  var basePath = "/" + name;

  var rsc = function( id ){
    return window.vej.member( id, basePath, engine );
  };

  var route = window.vej.route( basePath, engine );

  rsc.all = function all( data ){
    return route.act( "get", data );
  };

  rsc.create = function create( data ){
    return route.act( "post", data );
  };

  return rsc;
};

window.vej.member = function member( id, path, engine ){
  var basePath = path + "/" + id;

  var route = window.vej.route( basePath, engine );

  return {
    detail: function( data ){
      return route.act( "get", data );
    },
    delete: function( data ){
      return route.act( "delete", data );
    },
    update: function( data ){
      return route.act( "patch", data );
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
