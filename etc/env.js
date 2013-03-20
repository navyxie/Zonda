seajs.config({
  base: "/",
  charset: "utf-8",
  alias: {"underscore":"vendor/underscore/1.4.4/underscore","bootstrap":"vendor/bootstrap/2.3.1/bootstrap","jquery":"vendor/jquery/1.9.1/jquery","backbone":"vendor/backbone/0.9.10/backbone","modernizr":"vendor/modernizr/2.6.2/modernizr","util":"util/0.1.2/src/util"}
});

seajs.use("/test/case-list");