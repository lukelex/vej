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
