GLOBAL.window = {};

window.Promise = require("promise");

require("../src/setup");
require("../src/action_builder");
require("../src/resource");
require("../src/collection");
require("../src/member");
require("../src/route");
require("../src/request");

window.Zepto = {ajax: jasmine.createSpy("Zepto")};
window.jQuery = {ajax: jasmine.createSpy("jQuery")};
window.Ajax = {Request: jasmine.createSpy("Prototype")};
require("../src/proxies");

GLOBAL.vej = window.vej;
