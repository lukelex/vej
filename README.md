#Vej.js (experimental)

Vej.js enables you to create a declarative layer on top of your http library of choice.

```javascript
var users = vej.resource("users", vej.interfaces.httpjs);

users.all(); // GET /users
users.create({name: "Luke Skywalker"}); // POST /users {name: "Luke Skywalker"}
users("luke-skywalker").detail(); // GET /users/luke-skywalker
users("luke-skywalker").update({
  name: "Darth Vader"
}); // PATCH /users/luke-skywalker {name: "Darth Vader"}
users("luke-skywalker").delete(); // DELETE /users/luke-skywalker
```

##Available interfaces
* http.js - https://github.com/nauman1225/http.js
