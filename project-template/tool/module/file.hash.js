// Generated by CoffeeScript 1.6.3
(function() {
  var CONFIG, cache_file, colors, crypto, exec, file, file_content, fs, hash_map, hash_sum, hash_type, hex, name, path, project_dir, target, target_dir, _i, _len;

  require("js-yaml");

  fs = require("fs");

  path = require("path");

  colors = require("colors");

  exec = require("child_process").exec;

  crypto = require("crypto");

  console.log("\n\n Zonda Tool".bold + ":  Hash files...");

  project_dir = path.resolve('./', '../');

  target_dir = "" + project_dir + "/dist";

  CONFIG = require("" + project_dir + "/etc/zonda.yml");

  hash_type = CONFIG.version;

  if (hash_type !== "md5") {
    console.log("   >>".bold + " The version is not " + "'md5'".green + " in etc/zonda.yml, nothing to do!");
    return false;
  }

  target = ["app-" + hash_type + ".js", "framework-" + hash_type + ".js", "app-" + hash_type + ".css"];

  hash_map = {};

  for (_i = 0, _len = target.length; _i < _len; _i++) {
    file = target[_i];
    console.log(("\n   Hash dist/" + file + "...:  ").bold);
    hash_sum = crypto.createHash(hash_type);
    file_content = fs.readFileSync("" + target_dir + "/" + file);
    hash_sum.update(file_content);
    hex = hash_sum.digest("hex");
    hash_map[file] = hex;
    name = ("" + file).replace(hash_type, hex);
    fs.renameSync("" + target_dir + "/" + file, "" + target_dir + "/" + name);
    console.log("   >>".bold + " Success: ".green + "[" + ("" + hex).yellow + "]");
  }

  cache_file = "" + target_dir + "/.cache_hash_map.json";

  fs.writeFileSync(cache_file, JSON.stringify(hash_map));

  console.log("\n   [" + "Cache".green.inverse + "]" + " the md5 version > " + ("" + cache_file).yellow);

  console.log("\n\n Zonda Tool".bold + " >> " + "Hash files" + " Success!\n".bold.yellow);

}).call(this);