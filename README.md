#Vej.js (experimental)

Vej.js enables you to create a declarative layer on top of your HTTP library of choice.

Our goal is to allow you to define your resources whithout caring about the underlying HTTP library that's being used. So that you can later on replace it without having to change too much on your own code. You would only tell Vej what proxy to use given your new HTTP library.

##Usage

###Creating a resource
Calling the resource function will give you a function with a few inner functions that maps to four default HTTP verbs `GET, POST, PATCH & DELETE`.

```javascript
var jedis = vej.resource("jedis", vej.proxies.majaX);

jedis.all(); // GET /jedis
jedis.create({name: "Anakin Skywalker"}); // POST /jedis {name: "Anakin Skywalker"}
jedis("anakin-skywalker").detail(); // GET /jedis/anakin-skywalker
jedis("anakin-skywalker").update({
  name: "Darth Vader"
}); // PATCH /jedis/anakin-skywalker {name: "Darth Vader"}
jedis("anakin-skywalker").remove(); // DELETE /jedis/luke-skywalker
```

###Extending a resource
Vej lets your extend a resource with extra actions:

```javascript
var jedis = vej.resource("jedis", vej.proxies.majaX, function(rsc){
  rsc.get("with_experience");
  rsc.post("send_to_battle");
  rsc.patch("stand_your_ground");
  rsc.delete("fallback");
});

jedis.with_experience({lightsaber: "double"}); // GET /jedis/with_experience {lightsaber: "double"}
jedis.send_to_battle({strategy: "peace & love"}); // POST /jedis/send_to_battle {strategy: "peace & love"}
jedis.stand_your_ground({formation: "cocoon"}); // PATCH /jedis/stang_your_ground {formation: "cocoon"}
jedis.fallback({with: "tail between your legs"}); // DELETE /jedis/fallback {with: "tail between your legs"}
```

###Limiting resource creation

Vej allows you to limit the amount of action created for a given action.

```javascript
var jedis = vej.resource("jedis", vej.proxies.majaX, {only: ["all", "remove"]});

jedis.all() // GET /jedis
jedis.create // undefined
jedis("anakin").update // undefined
jedis("anakin").remove() // DELETE /jedis/luke-skywalker
```

##Promises
Vej wraps every request with a promise (Promises/A+). We rely on [then/promise](https://github.com/then/promise) to provide this funcionality.

```javascript
users("luke-skywalker").detail().then(function(data){
  data // {name: "Luke Skywalker", age: 26, midichlorians: 3000}
}, function(error){});
```

##Available proxies
* majaX - https://github.com/SimonWaldherr/majaX.js
