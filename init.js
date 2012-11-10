var app_version_type='prod';
switch( app_version_type ) {
    case 'dev':
        seajs.config({
            base : '/Zonda',
            alias : {
                'util' : 'util/0.1.0/src/util',
                'underscore' : 'lib/underscore/1.4.2/underscore',
                'bootstrap' : 'lib/bootstrap/2.1.1/bootstrap',
                'jquery' : 'lib/jquery/1.8.2/jquery',
                'jquery-ui' : 'lib/jquery-ui/1.9.0/jquery-ui',
                'easing' : 'lib/easing/1.3.0/easing',
                'modernizr' : 'lib/modernizr/2.6.1/modernizr',
                'moment' : 'lib/moment/1.7.2/moment',
                'zepto' : 'lib/zepto/1.0.1/zepto',
                'backbone' : 'lib/backbone/0.9.2/backbone',
                'fancybox' : 'lib/fancybox/1.3.4/fancybox',
                'jplayer' : 'lib/jplayer/2.1.0/jplayer',
                'countdown' : 'lib/countdown/1.0/countdown',
                'cloud-zoom' : 'lib/cloud-zoom/1.0.3/cloud-zoom'
            },
            preload : [
                Function.prototype.bind ? '' : 'lib/es5-safe',
                'core/1.3.0-dev/plugin-text',
                window.JSON ? '' : 'lib/json2/1.1.1/json2'
            ],
            charset : 'utf-8'
        });
        break;
    case 'prod':
        seajs.config({
            base : '/Zonda',
            preload : [
                Function.prototype.bind ? '' : 'lib/es5-safe',
                window.JSON ? '' : 'lib/json2/1.1.1/json2'
            ],
            charset : 'utf-8'
        });
        break;
    default:
        alert('Zonda Config Error!');
}
seajs.use('app/app');
