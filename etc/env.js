seajs.config({
  base: "/",
  charset: "utf-8",
  alias: {"underscore":"vendor/underscore/1.4.4/src/underscore","util":"util/src/util","bootstrap":"vendor/bootstrap/2.3.1/src/bootstrap","jquery":"vendor/jquery/1.9.1/src/jquery","backbone":"vendor/backbone/0.9.10/src/backbone","modernizr":"vendor/modernizr/2.6.2/src/modernizr"}
});

seajs.use("/test/case-list");