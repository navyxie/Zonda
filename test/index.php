<?php
require_once __DIR__.'/vendor/autoload.php';
use Symfony\Component\Finder\Finder;
function getConfig(){
    return array(
        'case_path'=>__DIR__.'/case/',
    );
}
function getAllFile(){
    $config = getConfig();
    $finder = new Finder;
    $files = $finder->name('*.js')->in($config['case_path']);
    $basePath = __DIR__;
    $output = array();
    foreach($files as $k1=>$v1){
        $fullPath = $v1->getPathName();
        if (strpos($fullPath,$basePath)!=0){
            continue;
        }
        $ret['url'] = '.'.substr($fullPath,strlen($basePath));
        $ret['name'] = $v1->getFileName();
        $output[] = $ret;
    }
    return $output;
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title>QUnit Test Suite for Zonda of Fruit84 </title>
<script>
var php_var=<?=json_encode(getAllFile())?>;
</script>
    <script src="/Zonda/core/1.3.0-dev/sea.js" data-main="/Zonda/init"></script>
</head>
<body>
	<div id="qunit"></div>
	<div id="qunit-fixture">test markup</div>
</body>
</html>
