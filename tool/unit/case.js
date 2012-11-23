// 返回测试脚本目录
var http = require('http');
var fileAll = require('./dir');
var fs = require('fs');
var path = require('path');

// case目录下的所有结果
var caseFileList = [];

var casePath = path.resolve( './', '../');

casePath = path.dirname( module.filename );

casePath = path.join( casePath, '../../test/case' );

console.log('测试目录' + casePath);

// 更新case信息
function updateCaseDIR ( event, fileName ) {

    // 判断是否为js文件
    if ( !/\.js$/.test( fileName ) ) {
        return false;
    }

    // 返回case目录下所有测试文件，文件路径
    caseFileList = [];

    fileAll( '../../test/case', function ( type, path ) {

        if ( type === 'file' ) {
            // 转成相对test的目录
            path.path = path.realpath.replace(/^.{1,}\/Zonda\//g, '');

            // 不暴露服务器目录
            delete path.realpath;

            caseFileList.push( path );
        }

    }, 100);

    if ( caseFileList === null ) {
        return false;
    }

    // 清除缓存文件
    for (var i = 0; i < caseFileList.length; i++) {
        if ( /.~$/.test( caseFileList[i].name ) || /.swp$/.test( caseFileList[i].name ) ) {
            caseFileList.splice( i, 1 );
        }
    }

    // 转成JSON
    caseFileList = JSON.stringify( caseFileList );

    console.log('即将写入case.js的内容:');
    console.log(caseFileList);

    // 写配置文件
    fs.writeFile('../../test/case.json', caseFileList, 'utf8', function (err) {
        if ( err !== null ) {
            console.log('发生错误了~');
            console.log(err);
        }
    });

} // END updateCaseDIR

// 递归case目录下的所有文件，监听case文件夹，如果文件夹改变，重写case.json
// TODO 新建文件夹无法被监听到
fileAll( casePath, function( type, cell ){

    fs.watch( cell.realpath, updateCaseDIR );

}, 100);

// 监听case根目录
fs.watch( casePath, updateCaseDIR );

/**
 * 由于开启服务后，该服务会独占某个端口，故放弃这种方法
// 创建服务
var server = http.createServer( function ( req, res ) {
    console.log(req.method);
    console.log(req.headers.host);

    res.writeHead( 200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });

    // 返回case目录下所有测试文件，文件路径
    caseFileList = [];

    fileAll( '../../test/case', function ( type, path ){
        if ( type === 'file' ) {
            // 转成相对test的目录
            path.path = path.realpath.replace(/^.{1,}\/Zonda\//g, '');

            // 不暴露服务器目录
            delete path.realpath;

            caseFileList.push( path );
        }
    }, 100);

    // 转成JSON
    caseFileList = JSON.stringify( caseFileList );

    res.end( caseFileList );
});

// 开启服务
server.listen( 11122, '0.0.0.0');
*/
