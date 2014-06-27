var route = require("./route");

module.exports = function member( id, path, engine ){
  var basePath = path + "/" + id;

  return {
    $basePath: basePath,
    route: route( basePath, engine ),
    detail: function detail( data ){
      return this.route.act( "get", data );
    },
    remove: function remove( data ){
      return this.route.act( "delete", data );
    },
    update: function update( data ){
      return this.route.act( "patch", data );
    }
  };
};
