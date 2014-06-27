var request = require("./request");

module.exports = function route( path, engine ){
  function run( spec, data ){
    spec.path = path;
    return request( spec, data, engine );
  };

  return {
    act: function act( method, data ){
      return run( { method: method }, data || {} );
    }
  };
};
