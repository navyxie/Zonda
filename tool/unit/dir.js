/**
 * function fileAll
 * 递归目录
 * 返回路径
 */
var fs = require('fs');
var path = require('path');

function fileAll ( dir, callBack, depth ) {
    if ( depth <= 0 ) {
        return false;
    }

    var dirFiles = [];

    if ( dir.realpath !== void 0 ) {
        dirFiles = fs.readdirSync( dir.realpath );
    } else {
        dirFiles = fs.readdirSync( dir );
    }

    // 转为绝对路径
    for (var i = 0; i < dirFiles.length; i++) {
        dirFiles[i] = {
            realpath : fs.realpathSync( dir + '/' + dirFiles[i] ),
            name : dirFiles[i]
        };
    }

    // 递归
    for ( var j = 0, l = dirFiles.length; j < l; j++ ) {

        // 是文件
        if ( fs.statSync( dirFiles[j].realpath ).isFile() ) {
            callBack( 'file', dirFiles[j] );
        // 是目录
        } else {
            fileAll( dirFiles[j].realpath, callBack, depth-1 );
            callBack( 'dir', dirFiles[j] );
        }

    }

} // END fileAll

// API
module.exports = fileAll;
