/**
 * localStorageSync test
 * for Backbone
 */
define(function(require, exports, module){
    var Q = require('qunit');
    var _ = require('underscore');

    Q.module('LocalStorageSyncTest');

    // 待测试模块
    var Sync = require('util').sync;

    // 依赖模块
    var Backbone = require('backbone');

    Backbone.sync = Sync;

    Q.test('sync API', function(){
        Q.ok( (typeof Sync === 'function'),'Sync方法');
    });

    Q.test('sync::create, Model::save', function(){
        var model = new Backbone.Model();

        model.url = '/mock';

        var res;

        model.on('change', function(data){
            res = data;
        });

        model.save({name:'shiyang',age:23});

        Q.ok( res.id, '获得ID');

        Q.strictEqual( res.toJSON().name, 'shiyang', '检测name');
        Q.strictEqual( res.toJSON().age, 23, '检测age');
    });

    Q.test('sync::create, Model::set, save', function(){
        var model = new Backbone.Model();

        model.url = '/mock';

        var res;

        model.on('change', function(data){
            res = data;
        });

        model.set({name:'degas',age:21});
        model.save();

        Q.ok( res.id, '获得ID');

        Q.strictEqual( res.toJSON().name, 'degas', '检测name');
        Q.strictEqual( res.toJSON().age, 21, '检测age');
    });

    Q.test('sync::create, Collection::create', function(){
        var Model = Backbone.Model.extend({
            url : "/mock"
        });

        var Collection = Backbone.Collection.extend({
            url : "/mock",
            initialize : function ( Model ) {
                this.model = Model;
            }
        });

        var collection = new Collection( Model ),
            res;

        collection.on('change',function(data){
            res = data;
        });

        collection.create({name:'liujinsong668',age:11});

        Q.ok(res.id,'获取ID');
        Q.strictEqual( res.toJSON().name, 'liujinsong668', '检测name');
        Q.strictEqual( res.toJSON().age, 11, '检测age');

    });

    Q.test('sync::read', function(){
        var Model = Backbone.Model.extend({
            url : "/mock"
        });

        var Collection = Backbone.Collection.extend({
            url : "/mock",
            initialize : function ( Model ) {
                this.model = Model;
            }
        });

        var collection = new Collection( Model );

        var oldCollection = JSON.stringify( collection );

        collection.fetch();

        var newCollection = JSON.stringify( collection );

        Q.notDeepEqual( oldCollection, newCollection, '取得不相同的数据');
    });

    Q.test('sync::update, Model::save', function(){
        var Model = Backbone.Model.extend({
            url : "/mock"
        });

        var Collection = Backbone.Collection.extend({
            url : "/mock",
            initialize : function ( Model ) {
                this.model = Model;
            }
        });

        var collection = new Collection( Model );

        collection.fetch();

        // 取出某一条已有的数据
        var some = collection.where({
            name : 'shiyang'
        });

        some = some[0];

        some.set({
            name : '施扬'
        });

        some.save();

        var newSome = collection.where({
            name : '施扬'
        });

        collection.fetch();

        Q.strictEqual( newSome[0].id, some.id, 'Model id 相同');

    });

    Q.test('sync::delete, Model::destroy', function(){
        var Model = Backbone.Model.extend({
            url : "/mock"
        });

        var Collection = Backbone.Collection.extend({
            url : "/mock",
            initialize : function ( Model ) {
                this.model = Model;
            }
        });

        var collection = new Collection( Model );

        collection.fetch();

        // 新加一个 model，稍后将删除这个 model
        collection.add({name:'Admin!!',age:121});

        _.each( collection.models, function ( cell, key ) {
            cell.save();
        });

        var some = collection.where({
            name : 'Admin!!'
        })[0];

        some.destroy();

        collection.fetch();

        Q.ok( !collection.get( some.id ), '被删除的model');
    });

});
