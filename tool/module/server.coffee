# Simple connect server for phantom.js
# Adapted from Modernizr
#
# source: Twitter Bootstrap js/test/server.js

connect = require "connect"
http = require "http"
fs = require "fs"
colors = require "colors"

port = 3000

app = connect().use connect.static "#{__dirname}/../../"

http.createServer(app).listen port

console.log "> The static server in".inverse + " http://localhost:".green + port + "/test/".red

fs.writeFileSync "#{__dirname}/pid.tmp", process.pid, "utf-8"
