GLOBAL.window = {};

window.Promise = require("promise");

require("../src/setup");
require("../src/resource");
require("../src/collection");
require("../src/member");
require("../src/route");
require("../src/request");

window.majaX = jasmine.createSpy("majaX");
require("../src/proxies");

GLOBAL.vej = window.vej;
