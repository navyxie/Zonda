seajs.config({
    base : '/Zonda',

    alias : {
        'util' : '0.1.0',
        'underscore' : 'lib/underscore/1.4.2/underscore',
        'bootstrap' : 'lib/bootstrap/2.1.1/bootstrap',
        'jquery' : 'lib/jquery/1.8.2/jquery',
        'jquery-ui' : 'lib/jquery-ui/1.9.0/jquery-ui',
        'easing' : 'lib/easing/1.3.0/easing',
        'modernizr' : 'lib/modernizr/2.6.1/modernizr',
        'moment' : 'lib/moment/1.7.2/moment',
        'zepto' : 'lib/zepto/1.0.1/zepto',
        'backbone' : 'lib/backbone/0.9.2/backbone',
        'fancybox' : 'lib/fancybox/1.3.4/fancybox'
        //'fancybox' : 'lib/fancybox/1.3.4/src/fancybox'
    },

    preload : [
        //'lib/modernizr/2.6.1/modernizr',
        Function.prototype.bind ? '' : 'lib/es5-safe',
        'core/1.2.1/plugin-text',
        window.JSON ? '' : 'lib/json2/1.1.1/json2'
    ],

    charset : 'utf-8'
});

seajs.use('app/app');
//seajs.use('app/leo');
