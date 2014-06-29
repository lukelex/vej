require("./spec_helper");

describe("resource", function(){
  it("list route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {page: 1, per: 10};

    jedis.all(params);
    expect(httpMock.get).toHaveBeenCalledWith(
      "/jedis", params, jasmine.any(Object)
    );
  });

  it("create route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {firstName: "Anakin", lastName: "Skywalker"};

    jedis.create(params);
    expect(httpMock.post).toHaveBeenCalledWith(
      "/jedis", params, jasmine.any(Object)
    );
  });

  it("detail route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {hypermedia: true};

    jedis("anakin-skywalker").detail(params);
    expect(httpMock.get).toHaveBeenCalledWith(
      "/jedis/anakin-skywalker", params, jasmine.any(Object)
    );
  });

  it("update route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {firstName: "Darth", lastName: "Vader"}

    jedis("anakin-skywalker").update(params);
    expect(httpMock.patch).toHaveBeenCalledWith(
      "/jedis/anakin-skywalker", params, jasmine.any(Object)
    );
  });

  it("delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {hard: true};

    jedis("darth-vader").remove(params);
    expect(httpMock.delete).toHaveBeenCalledWith(
      "/jedis/darth-vader", params, jasmine.any(Object)
    );
  });

  it("custom collection get route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.get("search");
    });

    var params = {side: "dark"};

    jedis.search(params);
    expect(httpMock.get).toHaveBeenCalledWith(
      "/jedis/search", params, jasmine.any(Object)
    );
  });

  it("custom collection post route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.post("follow");
    });

    var params = {jedis: ["anakyn", "obi-wan"]};

    jedis.follow(params);
    expect(httpMock.post).toHaveBeenCalledWith(
      "/jedis/follow", params, jasmine.any(Object)
    );
  });

  it("custom collection delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.remove("with_blue_saber");
    });

    var params = {reason: "it sucks!"};

    jedis.with_blue_saber(params);
    expect(httpMock.delete).toHaveBeenCalledWith(
      "/jedis/with_blue_saber", params, jasmine.any(Object)
    );
  });

  it("custom collection patch route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.patch("influence");
    });

    var params = {side: "darkside"};

    jedis.influence(params);
    expect(httpMock.patch).toHaveBeenCalledWith(
      "/jedis/influence", params, jasmine.any(Object)
    );
  });

  it("a request without params", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    jedis.all();

    expect(httpMock.get).toHaveBeenCalledWith(
      "/jedis", {}, jasmine.any(Object)
    );
  });

  describe("restricting to", function(){
    it("#all", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
      var jedis = vej.resource("jedis", httpMock, {only: ["all"]});

      jedis.all();

      expect(httpMock.get).toHaveBeenCalledWith(
        "/jedis", {}, jasmine.any(Object)
      );
      expect(jedis.create).toBeUndefined();
      expect(jedis.update).toBeUndefined();
      expect(jedis.remove).toBeUndefined();
    });

    it("#create", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
      var jedis = vej.resource("jedis", httpMock, {only: ["create"]});

      jedis.create({name: "Luke"});

      expect(httpMock.post).toHaveBeenCalledWith(
        "/jedis", {name: "Luke"}, jasmine.any(Object)
      );
      expect(jedis.all).toBeUndefined();
      expect(jedis.update).toBeUndefined();
      expect(jedis.remove).toBeUndefined();
    });

    it("#update", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
      var jedis = vej.resource("jedis", httpMock, {only: ["update"]});

      jedis("luke").update({name: "Luke Skywalker"});

      expect(httpMock.patch).toHaveBeenCalledWith(
        "/jedis/luke", {name: "Luke Skywalker"}, jasmine.any(Object)
      );
      expect(jedis.all).toBeUndefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis.remove).toBeUndefined();
    });

    it("#remove", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
      var jedis = vej.resource("jedis", httpMock, {only: ["remove"]});

      jedis("luke").remove();

      expect(httpMock.delete).toHaveBeenCalledWith(
        "/jedis/luke", {}, jasmine.any(Object)
      );
      expect(jedis.all).toBeUndefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis.update).toBeUndefined();
    });

    it("multiple actions", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["get", "patch"]);
      var jedis = vej.resource("jedis", httpMock, {only: ["all", "update"]});

      jedis.all();
      jedis("luke").update({name: "Luke Skywalker"});

      expect(httpMock.get).toHaveBeenCalledWith(
        "/jedis", {}, jasmine.any(Object)
      );
      expect(httpMock.patch).toHaveBeenCalledWith(
        "/jedis/luke", {name: "Luke Skywalker"}, jasmine.any(Object)
      );
      expect(jedis.create).toBeUndefined();
      expect(jedis.remove).toBeUndefined();
    });
  });
});
