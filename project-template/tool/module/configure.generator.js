// Generated by CoffeeScript 1.6.3
var CONFIG, alias, aliasGenerator, colors, dependencies, domain, fs, less_path_config, path, project_dir, seajs_config, spm_alias, vendor_list, zonda_vendor_dir;

require("js-yaml");

fs = require("fs");

path = require("path");

colors = require("colors");

console.log("\n\n Zonda Tool".bold + ":  Generate configure...");

project_dir = path.resolve('./', '../');

CONFIG = require("" + project_dir + "/etc/zonda.yml");

fs.writeFileSync("" + project_dir + "/etc/local_path.yml", "# Local Project Path For Zonda Tool\nproject_dir: " + project_dir);

console.log("\n   Local Project Path is:  ".bold + project_dir);

console.log("   Generate the " + "local_path.yml".underline + " to etc/");

aliasGenerator = require("./alias.generator");

zonda_vendor_dir = "vendor/Zonda/vendor";

vendor_list = aliasGenerator("" + project_dir + "/" + zonda_vendor_dir, zonda_vendor_dir);

console.log("\n   Generating the SeaJS Configure...");

alias = JSON.stringify(vendor_list.alias);

if (CONFIG.pattern === "dev") {
  domain = CONFIG.domain_dev;
} else {
  domain = CONFIG.domain_prod;
}

seajs_config = "seajs.config({\n  domain: \"" + domain + "\",\n  base: \"" + CONFIG.web_root + "\",\n  charset: \"utf-8\",\n  alias: " + alias + "\n});";

fs.writeFileSync("" + project_dir + "/etc/seajs_config.js", seajs_config);

console.log("   >>".bold + " Success!".green);

console.log("\n   Generating the Spm2 alias...");

dependencies = JSON.stringify(vendor_list.dependencies);

spm_alias = dependencies;

fs.writeFileSync("" + project_dir + "/etc/spm_alias.json", spm_alias);

console.log("   >>".bold + " Success!".green);

console.log("\n   Generating the path of Less...");

less_path_config = "// Path of Web root\n@root: \"" + CONFIG.web_root + "\";\n\n// Path of images\n@img: \"" + CONFIG.web_root + "/" + CONFIG.image_path + "\";\n\n// Path of FontAwesome Font\n@FontAwesomePath: \"" + CONFIG.web_root + "/" + CONFIG.FontAwesomePath + "\";";

fs.writeFileSync("" + project_dir + "/etc/less_path_config.less", less_path_config);

console.log("   >>".bold + " Success!".green);
