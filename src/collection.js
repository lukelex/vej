window.vej.collection = function collection( name, engine ){
  var basePath = asUrl( name );

  var rsc = function( id ){
    var memberPath = basePath + asUrl( id );
    return window.vej.member( memberPath, engine );
  };

  rsc.all = window.vej.route({
    path: basePath,
    action: "get"
  }, engine );

  rsc.create = window.vej.route({
    path: basePath,
    action: "post"
  }, engine );

  rsc.detail = window.vej.route({
    path: basePath,
    action: "post",
    member: true
  }, engine );

  function asUrl( name ){
    return "/" + name;
  }

  return rsc;
};
