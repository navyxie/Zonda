// 返回测试脚本目录
var http = require('http');
var fileAll = require('./dir');

// case目录下的所有结果
var caseFileList = [];

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
