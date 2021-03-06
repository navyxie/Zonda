// Generated by CoffeeScript 1.6.2
define(function(require) {
  var Base64, CN, CN_64, Util, syb, syb_64;

  module("Base64");
  Util = require("util");
  Base64 = Util.Base64;
  CN = "悲剧就是将有价值的东西毁灭给人看。";
  syb = "~!@#$%^&*()_+`-=\\][{}|;\"',./<?>";
  CN_64 = "";
  syb_64 = "";
  test("API", function() {
    ok(Base64.encode);
    return ok(Base64.decode);
  });
  test("Method", function() {
    ok(Base64.encode);
    ok(Base64.decode);
    strictEqual(typeof Base64.encode, "function");
    return strictEqual(typeof Base64.decode, "function");
  });
  test("Test encode CN", function() {
    CN_64 = Base64.encode(CN);
    ok(CN_64);
    syb_64 = Base64.encode(syb);
    return ok(syb_64);
  });
  test("Test encode syb", function() {
    syb_64 = Base64.encode(syb);
    return ok(syb_64);
  });
  test("Test decode CN", function() {
    var res_CN;

    res_CN = Base64.decode(CN_64);
    ok(res_CN);
    return equal(res_CN, CN);
  });
  return test("Test decode syb", function() {
    var res_syb;

    res_syb = Base64.decode(syb_64);
    ok(res_syb);
    return equal(res_syb, syb);
  });
});
