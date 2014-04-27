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
