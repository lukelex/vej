require("./spec_helper");

describe("proxies", function(){
  function get(proxy, data){ proxy.get(url, data); }
  function post(proxy, data){ proxy.post(url, data); }
  function del(proxy, data){ proxy.delete(url, data); }
  function put(proxy, data){ proxy.put(url, data); }
  function patch(proxy, data){ proxy.patch(url, data); }

  var url = "/jedis";
  var params = {lightsabers: "green"};

  describe("Zepto", function(){
    beforeEach(function(){
      window.Zepto.ajax.reset();
    });

    it("should delegate the GET correctly", function(){
      get(vej.proxies.Zepto, params);
      expect(window.Zepto.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "GET",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the POST correctly", function(){
      post(vej.proxies.Zepto, params);
      expect(window.Zepto.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "POST",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the DELETE correctly", function(){
      del(vej.proxies.Zepto, params);
      expect(window.Zepto.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "DELETE",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the PUT correctly", function(){
      put(vej.proxies.Zepto, params);
      expect(window.Zepto.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "PUT",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the PATCH correctly", function(){
      patch(vej.proxies.Zepto, params);
      expect(window.Zepto.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "PATCH",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });
  });

  describe("jquery", function(){
    beforeEach(function(){
      window.jQuery.ajax.reset();
    });

    it("should delegate the GET correctly", function(){
      get(vej.proxies.jQuery, params);
      expect(window.jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "GET",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the POST correctly", function(){
      post(vej.proxies.jQuery, params);
      expect(window.jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "POST",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the DELETE correctly", function(){
      del(vej.proxies.jQuery, params);
      expect(window.jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "DELETE",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the PUT correctly", function(){
      put(vej.proxies.jQuery, params);
      expect(window.jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "PUT",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });

    it("should delegate the PATCH correctly", function(){
      patch(vej.proxies.jQuery, params);
      expect(window.jQuery.ajax).toHaveBeenCalledWith({
        url: url,
        data: params,
        type: "PATCH",
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });
  });

  describe("Prototype", function(){
    beforeEach(function(){
      window.Ajax.Request.reset();
    });

    it("should delegate the GET correctly", function(){
      get(vej.proxies.Prototype, params);
      expect(window.Ajax.Request).toHaveBeenCalledWith(url, {
        parameters: params,
        method: "GET",
        onSuccess: jasmine.any(Function),
        onFailure: jasmine.any(Function)
      });
    });

    it("should delegate the POST correctly", function(){
      post(vej.proxies.Prototype, params);
      expect(window.Ajax.Request).toHaveBeenCalledWith(url, {
        parameters: params,
        method: "POST",
        onSuccess: jasmine.any(Function),
        onFailure: jasmine.any(Function)
      });
    });

    it("should delegate the DELETE correctly", function(){
      del(vej.proxies.Prototype, params);
      expect(window.Ajax.Request).toHaveBeenCalledWith(url, {
        parameters: params,
        method: "DELETE",
        onSuccess: jasmine.any(Function),
        onFailure: jasmine.any(Function)
      });
    });

    it("should delegate the PUT correctly", function(){
      put(vej.proxies.Prototype, params);
      expect(window.Ajax.Request).toHaveBeenCalledWith(url, {
        parameters: params,
        method: "PUT",
        onSuccess: jasmine.any(Function),
        onFailure: jasmine.any(Function)
      });
    });

    it("should delegate the PATCH correctly", function(){
      patch(vej.proxies.Prototype, params);
      expect(window.Ajax.Request).toHaveBeenCalledWith(url, {
        parameters: params,
        method: "PATCH",
        onSuccess: jasmine.any(Function),
        onFailure: jasmine.any(Function)
      });
    });
  });
});
