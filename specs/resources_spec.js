describe("resource", function(){
  it("list route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = vej.resource("users", httpMock);

    var params = {page: 1, per: 10};

    users.all(params);
    expect(httpMock.get).toHaveBeenCalledWith("/users", {data: params});
  });

  it("create route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var users = vej.resource("users", httpMock);

    var params = {firstName: "Anakin", lastName: "Skywalker"};

    users.create(params);
    expect(httpMock.post).toHaveBeenCalledWith("/users", {data: params});
  });

  it("detail route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = vej.resource("users", httpMock);

    var params = {hypermedia: true};

    users('luke-skywalker').detail(params);
    expect(httpMock.get).toHaveBeenCalledWith("/users/luke-skywalker", {data: params});
  });

  it("update route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
    var users = vej.resource("users", httpMock);

    var params = {firstName: "Darth", lastName: "Vader"}

    users("luke-skywalker").update(params);
    expect(httpMock.patch).toHaveBeenCalledWith("/users/luke-skywalker", {data: params});
  });

  it("delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var users = vej.resource("users", httpMock);

    var params = {hard: true};

    users("darth-vader").delete(params);
    expect(httpMock.delete).toHaveBeenCalledWith("/users/darth-vader", {data: params});
  });
});
