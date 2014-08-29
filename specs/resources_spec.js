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

  describe("custom collection routes", function(){
    it("#get", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.collection.get("search");
      });

      var params = {side: "dark"};

      jedis.search(params);
      expect(httpMock.get).toHaveBeenCalledWith(
        "/jedis/search", params, jasmine.any(Object)
      );
    });

    it("#post", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.collection.post("follow");
      });

      var params = {jedis: ["anakyn", "obi-wan"]};

      jedis.follow(params);
      expect(httpMock.post).toHaveBeenCalledWith(
        "/jedis/follow", params, jasmine.any(Object)
      );
    });

    it("#delete", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.collection.remove("with_blue_saber");
      });

      var params = {reason: "it sucks!"};

      jedis.with_blue_saber(params);
      expect(httpMock.delete).toHaveBeenCalledWith(
        "/jedis/with_blue_saber", params, jasmine.any(Object)
      );
    });

    it("#patch", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.collection.patch("influence");
      });

      var params = {side: "darkside"};

      jedis.influence(params);
      expect(httpMock.patch).toHaveBeenCalledWith(
        "/jedis/influence", params, jasmine.any(Object)
      );
    });

    it("#put", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["put"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.collection.put("influence");
      });

      var params = {side: "darkside"};

      jedis.influence(params);
      expect(httpMock.put).toHaveBeenCalledWith(
        "/jedis/influence", params, jasmine.any(Object)
      );
    });
  });

  describe("custom member routes", function(){
    it("#get", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.member.get("jedis_killed");
      });

      var params = {level: "younglings"};

      jedis("anakin").jedis_killed(params);
      expect(httpMock.get).toHaveBeenCalledWith(
        "/jedis/anakin/jedis_killed", params, jasmine.any(Object)
      );
    });

    it("#post", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.member.post("add_disciple");
      });

      var params = {name: "star killer"};

      jedis("anakin").add_disciple(params);
      expect(httpMock.post).toHaveBeenCalledWith(
        "/jedis/anakin/add_disciple", params, jasmine.any(Object)
      );
    });

    it("#delete", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.member.remove("remove_rank");
      });

      var params = {which: "jedi"};

      jedis("anakin").remove_rank(params);
      expect(httpMock.delete).toHaveBeenCalledWith(
        "/jedis/anakin/remove_rank", params, jasmine.any(Object)
      );
    });

    it("#patch", function(){
      var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
      var jedis = vej.resource("jedis", httpMock, function(){
        this.member.patch("change_lightsaber");
      });

      var params = {color: "red"};

      jedis("anakin").change_lightsaber(params);
      expect(httpMock.patch).toHaveBeenCalledWith(
        "/jedis/anakin/change_lightsaber", params, jasmine.any(Object)
      );
    });
  });

  it("a request without params", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    jedis.all();

    expect(httpMock.get).toHaveBeenCalledWith(
      "/jedis", {}, jasmine.any(Object)
    );
  });

  describe("restricting with inclusion", function(){
    it("#all", function(){
      var jedis = vej.resource("jedis", {}, {only: ["all"]});

      expect(jedis.all).toBeDefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis().update).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
    });

    it("#create", function(){
      var jedis = vej.resource("jedis", {}, {only: ["create"]});

      expect(jedis.create).toBeDefined();
      expect(jedis.all).toBeUndefined();
      expect(jedis().update).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
    });

    it("#detail", function(){
      var jedis = vej.resource("jedis", {}, {only: ["detail"]});

      expect(jedis().detail).toBeDefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis.all).toBeUndefined();
      expect(jedis().update).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
    });

    it("#update", function(){
      var jedis = vej.resource("jedis", {}, {only: ["update"]});

      expect(jedis().update).toBeDefined();
      expect(jedis.all).toBeUndefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
    });

    it("#remove", function(){
      var jedis = vej.resource("jedis", {}, {only: ["remove"]});

      expect(jedis().remove).toBeDefined();
      expect(jedis.all).toBeUndefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis().update).toBeUndefined();
    });

    it("multiple actions", function(){
      var jedis = vej.resource("jedis", {}, {only: ["all", "update"]});

      expect(jedis.all).toBeDefined();
      expect(jedis().update).toBeDefined();
      expect(jedis().detail).toBeUndefined();
      expect(jedis.create).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
    });
  });

  describe("restricting with exclusion", function(){
    it("#all", function(){
      var jedis = vej.resource("jedis", {}, {except: ["all"]});

      expect(jedis.all).toBeUndefined()
      expect(jedis.create).toBeDefined();
      expect(jedis().detail).toBeDefined();
      expect(jedis().update).toBeDefined();
      expect(jedis().remove).toBeDefined();
    });

    it("#create", function(){
      var jedis = vej.resource("jedis", {}, {except: ["create"]});

      expect(jedis.create).toBeUndefined();
      expect(jedis.all).toBeDefined()
      expect(jedis().detail).toBeDefined();
      expect(jedis().update).toBeDefined();
      expect(jedis().remove).toBeDefined();
    });

    it("#detail", function(){
      var jedis = vej.resource("jedis", {}, {except: ["detail"]});

      expect(jedis().detail).toBeUndefined();
      expect(jedis.create).toBeDefined();
      expect(jedis.all).toBeDefined()
      expect(jedis().update).toBeDefined();
      expect(jedis().remove).toBeDefined();
    });

    it("#update", function(){
      var jedis = vej.resource("jedis", {}, {except: ["update"]});

      expect(jedis().update).toBeUndefined();
      expect(jedis.all).toBeDefined()
      expect(jedis().detail).toBeDefined();
      expect(jedis.create).toBeDefined();
      expect(jedis().remove).toBeDefined();
    });

    it("#remove", function(){
      var jedis = vej.resource("jedis", {}, {except: ["remove"]});

      expect(jedis().remove).toBeUndefined();
      expect(jedis.all).toBeDefined()
      expect(jedis().detail).toBeDefined();
      expect(jedis.create).toBeDefined();
      expect(jedis().update).toBeDefined();
    });

    it("multiple actions", function(){
      var jedis = vej.resource("jedis", {}, {except: ["create", "remove"]});

      expect(jedis.create).toBeUndefined();
      expect(jedis().remove).toBeUndefined();
      expect(jedis().detail).toBeDefined();
      expect(jedis.all).toBeDefined();
      expect(jedis().update).toBeDefined();
    });
  });
});
