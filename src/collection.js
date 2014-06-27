var member = require("./member"),
    route = require("./route"),
    proxies = require("./proxies");

module.exports = function collection( name, engine ){
  var rsc = function rsc( id ){
    rsc.member = member( id, rsc.$basePath, engine );
    return rsc.member;
  };

  rsc.$basePath = "/" + name;

  var collectionRoute = route( rsc.$basePath, engine );

  rsc.all = function all( data ){
    return collectionRoute.act( "get", data );
  };

  rsc.create = function create( data ){
    return collectionRoute.act( "post", data );
  };

  return rsc;
};
