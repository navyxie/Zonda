seajs.config({
    base : '/Zonda',

    alias : {
        'util' : 'util/util',
        'underscore' : 'lib/underscore/1.4.2/underscore',
        'bootstrap' : 'lib/bootstrap/2.1.0/bootstrap',
        'jquery' : 'lib/jquery/1.8.2/jquery',
        'jquery-ui' : 'lib/jquery-ui/1.9.0/jquery-ui',
        'easing' : 'lib/easing/1.3.0/easing',
        'backbone' : 'lib/backbone/0.9.2/backbone'
    },

    preload : [
        'lib/modernizr/2.6.1/modernizr',
        'core/1.2.1/plugin-text',
        window.JSON ? '' : 'lib/json',
        Function.prototype.bind ? '' : 'lib/es5-safe'
    ],

    charset : 'utf-8'
});

seajs.use('app/app');
seajs.use('app/leo');
