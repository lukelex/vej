describe("resource", function(){
  it("list route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {page: 1, per: 10};

    jedis.all(params);
    expect(httpMock.get).toHaveBeenCalledWith("/jedis", {data: params});
  });

  it("create route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {firstName: "Anakin", lastName: "Skywalker"};

    jedis.create(params);
    expect(httpMock.post).toHaveBeenCalledWith("/jedis", {data: params});
  });

  it("detail route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {hypermedia: true};

    jedis('anakin-skywalker').detail(params);
    expect(httpMock.get).toHaveBeenCalledWith("/jedis/anakin-skywalker", {data: params});
  });

  it("update route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {firstName: "Darth", lastName: "Vader"}

    jedis("anakin-skywalker").update(params);
    expect(httpMock.patch).toHaveBeenCalledWith("/jedis/anakin-skywalker", {data: params});
  });

  it("delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var jedis = vej.resource("jedis", httpMock);

    var params = {hard: true};

    jedis("darth-vader").delete(params);
    expect(httpMock.delete).toHaveBeenCalledWith("/jedis/darth-vader", {data: params});
  });

  it("custom collection get route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.get("search");
    });

    var params = {side: "dark"};

    jedis.search(params);
    expect(httpMock.get).toHaveBeenCalledWith("/jedis/search", {data: params});
  });

  it("custom collection post route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var jedis = vej.resource("jedis", httpMock, function(rsc){
      rsc.post("follow");
    });

    var params = {jedis: ['anakyn', 'obi-wan']};

    jedis.follow(params);
    expect(httpMock.post).toHaveBeenCalledWith("/jedis/follow", {data: params});
  });
});
