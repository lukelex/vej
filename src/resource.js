(function(){
  window.vej.resource = function resource( name, engine ){
    var rsc = window.vej.collection( name, engine );

    return rsc;
  };
}());
