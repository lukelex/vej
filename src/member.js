window.vej.member = function member( id, path, engine ){
  var basePath = path + "/" + id;

  var route = window.vej.route( basePath, engine );

  return {
    detail: function(){
      return route.act( "get" );
    },
    delete: function(){
      return route.act( "delete" );
    },
    update: function(){
      return route.act( "patch" );
    }
  };
}
