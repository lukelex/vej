describe("resource", function(){
  it("list route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = vej.resource("users", httpMock);

    users.all();
    expect(httpMock.get).toHaveBeenCalledWith("/users");
  });

  it("create route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var users = vej.resource("users", httpMock);

    users.create();
    expect(httpMock.post).toHaveBeenCalledWith("/users");
  });

  it("detail route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = vej.resource("users", httpMock);

    users('12345').detail();
    expect(httpMock.get).toHaveBeenCalledWith("/users/12345");
  });

  it("update route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["patch"]);
    var users = vej.resource("users", httpMock);

    users("12345").update();
    expect(httpMock.patch).toHaveBeenCalledWith("/users/12345");
  });

  it("delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var users = vej.resource("users", httpMock);

    users("12345").delete();
    expect(httpMock.delete).toHaveBeenCalledWith("/users/12345");
  });
});
