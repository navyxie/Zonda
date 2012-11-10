#!/usr/local/bin/node
/**
 * less.js
 * node 程序，监听css文件夹，less文件改变时，编译
 */
console.log('启动less编译...');

var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

// 设置css路径
var cssPath = path.resolve( './', '../');

cssPath = path.dirname( module.filename );

cssPath = path.join( cssPath, '../css' );

// 调用shell运行lessc编译.less文件
function lessToCss ( fileName, filePath ) {

    // 判断是否为less文件
    if ( !/\.less$/.test( fileName ) ) {
        return false;
    }

    console.log( fileName + ' 编译中...');

    var baseName = path.basename( fileName, '.less' );
    
    /**
     * 通过Shell调用lessc
     * 使用 lessc -x 打包
     */
    // 先直接编译init.less
    exec( 'lessc -x ' + cssPath + '/init.less > ' + cssPath + '/build/init.css', { encoding: ''},
        function ( err, stdout, stderr ) {
            // init.less 出现错误
            if ( err !== null ) {
                console.log('init.less 编译失败，请检查其包含的文件');
                console.log(err);
                // 再打包改变的文件
                exec( 'lessc -x ' + filePath + '/' + fileName + ' > ' + cssPath + '/build/' + baseName + '.css', { encoding: ''},
                    function ( err, stdout, stderr ) {
                        if ( err !== null ) {
                            console.log('\r');
                            console.error('>>>>>>>>>> ' + fileName + ' 编译错误！ <<<<<<<<<<\n\r');
                            console.log(err);
                        } else {
                            console.log( baseName + '.css 编译成功！');
                        }
                    }
                );

            // 正确
            } else {
                console.log( 'init.css 编译成功！');
            }
        } // END callBack
    ); // END exec

    /**
     * less的node版本实现
     * less in node 无法解决相对路径问题
     */
    /**
    var less = require('less');
    var compiler = new (less.Parser)({});

    var lessDATA = fs.readFileSync( filePath + '/' + fileName ,'utf8');

    compiler.parse( lessDATA, function(err, tree){
        if ( err !== null ) {
            console.error(err);
        }

        try{
            fs.writeFileSync(cssPath + '/build/' + baseName + '.css', tree.toCSS({ compress: false }), 'utf8');
        }catch(e){
            console.error(e);
        }
    });

    // 编译入口文件
    if ( fileName !== 'init.less' ) {
        fs.readFile( cssPath + '/' + 'init.less', 'utf8', function (err,data){
            if ( err !== null ) {
                console.error(err);
            } else {
                compiler.parse( data, function (err,tree){
                    if ( err !== null ) {
                        console.error(err);
                    }

                    try{
                        fs.writeFileSync(cssPath + '/build/init.css', tree.toCSS({ compress: false }), 'utf8');
                    }catch(e){
                        console.error(e);
                    }
                });
            }
        });
    }


    console.log( fileName + '编译完成');
    */

} // lessToCss

/**
 * 文件目录递归封装
 * 回调函数
 * function ( type, path ) {
 *      // type : 'file' / 'dir'
 * }
 */
function fileAll ( dir, callBack, depth ) {
    if ( depth <= 0 ) {
        return false;
    }

    var files = [];
    var dirFiles = fs.readdirSync(dir);

    // 转为绝对路径
    for (var i = 0; i < dirFiles.length; i++) {
        dirFiles[i] = fs.realpathSync( dir + '/' + dirFiles[i] );
    }

    // 递归
    for (var j = 0, l = dirFiles.length; j < l; j++) {

        // 是文件
        if ( fs.statSync(dirFiles[j]).isFile() ) {
            callBack( 'file', dirFiles[j] );
        // 是目录
        } else {
            fileAll( dirFiles[j], callBack, depth-1 );
            callBack( 'dir', dirFiles[j] );
        }

    }

} // END watchAll

// 监听文件改变，编译less
fileAll( cssPath, function( type, path ){
    if ( type === 'dir' ) {
        fs.watch( path, function (event, name) {
            if ( event === 'change' ) {
                lessToCss(name, path);
            }
        });
    }
}, 15);

// 监听入口文件
fs.watch( cssPath, function (event, name) {
    if ( event === 'change' ) {
        lessToCss(name, cssPath);
    }
});

// 启动时，自动编译init.less
lessToCss('init.less', cssPath);
