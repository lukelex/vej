GLOBAL.majaX = jasmine.createSpy("majaX");
var vej = require("../src/entrypoint");

describe("proxies", function(){
  function get(proxy, data){ proxy.get(url, data); }
  function post(proxy, data){ proxy.post(url, data); }
  function del(proxy, data){ proxy.delete(url, data); }
  function patch(proxy, data){ proxy.patch(url, data); }

  var url = "/jedis";
  var params = {lightsabers: "green"};

  describe("majaX", function(){
    beforeEach(function(){
      majaX.reset();
    });

    it("should delegate the GET correctly", function(){
      get(vej.proxies.majaX, params);
      expect(majaX).toHaveBeenCalledWith({
        url: url,
        data: params,
        method: "GET"
      }, jasmine.any(Function), jasmine.any(Function));
    });

    it("should delegate the POST correctly", function(){
      post(vej.proxies.majaX, params);
      expect(majaX).toHaveBeenCalledWith({
        url: url,
        data: params,
        method: "POST"
      }, jasmine.any(Function), jasmine.any(Function));
    });

    it("should delegate the DELETE correctly", function(){
      del(vej.proxies.majaX, params);
      expect(majaX).toHaveBeenCalledWith({
        url: url,
        data: params,
        method: "DELETE"
      }, jasmine.any(Function), jasmine.any(Function));
    });

    it("should delegate the PATCH correctly", function(){
      patch(vej.proxies.majaX, params);
      expect(majaX).toHaveBeenCalledWith({
        url: url,
        data: params,
        method: "PATCH"
      }, jasmine.any(Function), jasmine.any(Function));
    });
  });
});
