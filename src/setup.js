window.resources = function resources( name, engine ){
  if ( !engine ) {
    engine = Http;
  }

  var basePath = window.resources.asUrl( name );

  var rsc = function( id ){
    if ( id ) {
      return engine.get( basePath + "/" + id );
    } else {
      return engine.get( basePath );
    }
  };

  rsc.create = function create(){
    return engine.post( basePath );
  };

  return rsc;
};

window.resources.asUrl = function asUrl( name ){
  return "/" + name;
}
