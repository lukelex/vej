GLOBAL.window = GLOBAL.window || {};

require("../src/setup");
require("../src/proxies");

var vej = GLOBAL.window.vej;

describe("proxies", function(){
  function get(proxy, data){ proxy.get(url, data); }
  function post(proxy, data){ proxy.post(url, data); }
  function del(proxy, data){ proxy.delete(url, data); }
  function patch(proxy, data){ proxy.patch(url, data); }

  var url = "/jedis";
  var params = {lightsabers: "green"};

  describe("httpjs", function(){
    beforeEach(function(){
      var starter = {start: function(){}};
      GLOBAL.Http = {
        Get: function(){ return starter; },
        Post: function(){ return starter; },
        Delete: function(){ return starter; },
        Put: function(){ return starter; },
      };
      spyOn(GLOBAL.Http, "Get").andCallThrough();
      spyOn(GLOBAL.Http, "Post").andCallThrough();
      spyOn(GLOBAL.Http, "Delete").andCallThrough();
      spyOn(GLOBAL.Http, "Put").andCallThrough();
    });

    it("should delegate the GET correctly", function(){
      get(vej.proxies.httpjs, params);
      expect(GLOBAL.Http.Get).toHaveBeenCalledWith(url, params, false);
    });

    it("should delegate the POST correctly", function(){
      post(vej.proxies.httpjs, params);
      expect(GLOBAL.Http.Post).toHaveBeenCalledWith(url, params, false);
    });

    it("should delegate the DELETE correctly", function(){
      del(vej.proxies.httpjs, params);
      expect(GLOBAL.Http.Delete).toHaveBeenCalledWith(url, params, false);
    });

    it("should delegate the PATCH correctly", function(){
      patch(vej.proxies.httpjs, params);
      expect(GLOBAL.Http.Put).toHaveBeenCalledWith(url, params, false);
    });
  });
});
