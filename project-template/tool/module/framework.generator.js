// Generated by CoffeeScript 1.6.3
var CONFIG, aliasGenerator, colors, fs, name, path, project_dir, sea, sea_config, sea_plugin_text, vendor_list, zonda_vendor_dir, _vendor_content;

require("js-yaml");

fs = require("fs");

path = require("path");

colors = require("colors");

console.log("\n\n Zonda Tool".bold + ":  Generate framework...");

project_dir = path.resolve('./', '../');

CONFIG = require("" + project_dir + "/etc/zonda.yml");

fs.readdir("" + project_dir + "/dist", function(err) {
  if (err !== null) {
    return fs.mkdirSync("" + project_dir + "/dist");
  }
});

console.log(("\n   Generate simple framework-" + CONFIG.version + ".js...:  ").bold);

sea = fs.readFileSync("" + project_dir + "/vendor/Zonda/vendor/sea/" + CONFIG.sea_version + "/sea-debug.js");

sea_plugin_text = fs.readFileSync("" + project_dir + "/vendor/Zonda/vendor/sea/" + CONFIG.sea_version + "/seajs-text-debug.js");

sea_config = fs.readFileSync("" + project_dir + "/etc/seajs_config.js");

fs.writeFileSync("" + project_dir + "/dist/framework-" + CONFIG.version + ".js", sea + sea_plugin_text + sea_config);

console.log("   >>".bold + " Success!".green);

if (CONFIG.pattern === "prod") {
  zonda_vendor_dir = "vendor/Zonda/vendor";
  aliasGenerator = require("./alias.generator");
  vendor_list = aliasGenerator("" + project_dir + "/" + zonda_vendor_dir, zonda_vendor_dir);
  console.log(("\n   Combo vendors into framework-" + CONFIG.version + ".js...:  ").bold);
  for (name in vendor_list.dependencies) {
    console.log("\n     Combining: ".bold + ("" + name) + ("[" + vendor_list.info[name] + "]").yellow);
    _vendor_content = fs.readFileSync("" + project_dir + "/" + vendor_list.alias[name] + ".js");
    fs.appendFileSync("" + project_dir + "/dist/framework-" + CONFIG.version + ".js", _vendor_content);
    console.log("     >>".bold + " Success!".green);
  }
}

console.log("\n\n Zonda Tool".bold + " >> " + ("Generate framework-" + CONFIG.version + ".js") + " Success!\n".bold.yellow);