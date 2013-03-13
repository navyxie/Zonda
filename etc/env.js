seajs.config({
  base: "/",
  charset: "utf-8",
  alias: {"underscore":"vendor/underscore/1.4.4/underscore","bootstrap":"vendor/bootstrap/2.3.1/bootstrap","jquery":"vendor/jquery/1.9.1/jquery","backbone":"vendor/backbone/0.9.10/backbone","modernizr":"vendor/modernizr/2.6.2/modernizr"}
});

seajs.use("/test/case-list");