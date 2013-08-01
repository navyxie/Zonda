# deploy.coffee
# -------------
# Generate the bootstrap HTML for APP

fs = require "fs"
path = require "path"

project_dir = path.resolve './', '../'

app_version = fs.readFileSync "#{project_dir}/tool/.app_version", "utf8"
app_root = fs.readFileSync "#{project_dir}/tool/.app_root", "utf8"
framework_version = fs.readFileSync "#{project_dir}/tool/.framework_version", "utf8"
deploy_file = fs.readFileSync "#{project_dir}/tool/.deploy_file", "utf8"
app_name = fs.readFileSync "#{project_dir}/tool/.app_name", "utf8"

app_version = app_version.replace "\n", ""
app_root = app_root.replace "\n", ""
framework_version = framework_version.replace "\n", ""
deploy_file = deploy_file.replace "\n", ""
app_name = app_name.replace "\n", ""

TPL = """
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <title>#{app_name}</title>
  <link rel="stylesheet" href="#{app_root}/dist/dist-#{app_version}.css" />
</head>
<body>
</body>
<script src="#{app_root}/dist/framework-#{framework_version}.js" id="seajsnode" data-main="#{app_root}/dist/app-#{app_version}.js" ></script>
</html>
"""

fs.writeFileSync deploy_file, TPL
