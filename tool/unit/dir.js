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

    // 清除缓存文件
    for (var i = 0; i < dirFiles.length; i++) {
        if ( /.~$/.test( dirFiles[i] ) || /.swp$/.test( dirFiles[i] ) ) {
            dirFiles.splice( i, 1 );
        }
    }

    // TODO
    // 清除缓存文件后，还是会出现缓存文件，正则没有问题，其他原因？？
    // 转为绝对路径
    try {
        for ( i = 0; i < dirFiles.length; i++) {

            dirFiles[i] = {
                realpath : fs.realpathSync( dir + '/' + dirFiles[i] ),
                name : dirFiles[i]
            };
        }

        // 递归
        for ( i = 0; i < dirFiles.length; i++ ) {

            // 是文件
            if ( fs.statSync( dirFiles[i].realpath ).isFile() ) {
                callBack( 'file', dirFiles[i], depth );
            // 是目录
            } else {
                fileAll( dirFiles[i].realpath, callBack, depth-1 );
                callBack( 'dir', dirFiles[i], depth );
            }

        }

    } catch (err) {
    }

} // END fileAll

// API
module.exports = fileAll;
