describe("collection", function(){
  it("list route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = resources("users", httpMock);

    users();
    expect(httpMock.get).toHaveBeenCalledWith("/users");
  });

  it("create route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["post"]);
    var users = resources("users", httpMock);

    users.create();
    expect(httpMock.post).toHaveBeenCalledWith("/users");
  });

  it("detail route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["get"]);
    var users = resources("users", httpMock);

    users("12345");
    expect(httpMock.get).toHaveBeenCalledWith("/users/12345");
  });

  it("delete route", function(){
    var httpMock = jasmine.createSpyObj("HttpMock", ["delete"]);
    var users = resources("users", httpMock);

    users("12345").delete();
    expect(httpMock.get.calls.length).toEqual(1);
    expect(httpMock.get).toHaveBeenCalledWith("/users/12345");
  });
});
