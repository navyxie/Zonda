/**
 * Tips模块
 * author: niko.yerya
 * ******************************************************************************
 * 代码示例
 * var Tips = require("tips.module");
 * Tips.init({"target":node,"content":"niko.yerya","action":"hover","name":"tips-box","atuo":true});
 * 样式可以自己设定，content可以传入标签创建
 *
 * ******************************************************************************
 *
 */

define( function ( require, exports, module ) {

	var dom = document,
		target,
		content,
		action,
		name,
		auto;

	//初始化，传递参数
	function init ( userConfigs ) {
		target = userConfigs.target.find ? userConfigs.target[0] : userConfigs.target;
		content = userConfigs.content || "niko-yerya"; 
		action = userConfigs.action || "click";
		name = userConfigs.name || "tips-box";
		auto = userConfigs.auto || true;
		createTips();
	}

	//创造Tips
	function createTips () {

		var tipsNode = dom.createElement("span");
			tipsNode.className = name;

		addClass(target,"tips-wrap");

		if ( target.getAttribute("tips-info") ) {

			tipsNode.innerHTML = target.getAttribute("tips-info");

		} else {

			tipsNode.innerHTML = content;

		}

		if ( auto ) {

			target.style.position = "relative";
			target.style.cursor = "help";
			tipsNode.style.position = "absolute";
			tipsNode.style.display = "block";
			tipsNode.style.visibility = "hidden";

		}

		target.appendChild( tipsNode );
		controll();

	}

	//控制器
	function controll () {

		switch ( action ) {

			case "hover": 

				addEvent(target, "mouseover", function(event){
					var event = event || window.event,
						target = event.target || event.srcElement;

					if( !hasClass(target, name) ) {
						show( target.getElementsByClassName( name )[0] );
					}

				});
				addEvent(target, "mouseout", function(event){
					var event = event || window.event,
						target = event.target || event.srcElement;

					if( !hasClass(target, name) ) {
						hide( target.getElementsByClassName( name )[0] );
					}
					
				});

			break;

			case "click":

				addEvent(target, "click", function(event){

					var event = event || window.event,
						target = event.target || event.srcElement,
						tipsNode = target.getElementsByClassName( name )[0];

					if( !hasClass(target, name) ) { 
						if ( hasClass( target, "tips-clicked" ) ) {
							hide( tipsNode );
							removeClass( target, "tips-clicked" );
						} else {
							show( tipsNode );
							addClass( target, "tips-clicked" );
						}
					}
					
				});

			break;

			default:
			break;
		}	

	}

	//功能函数
	function show ( target ) {
		target.style.visibility = "visible";
	}

	function hide ( target ) {
		target.style.visibility = "hidden";
	}

	//扩充getElementsByClass
	if ( !document.getElementsByClassName ) {

		Object.prototype.getElementsByClassName = function ( classText ) {

			var nodes = [],
				all = this.getElementsByTagName("*");

			for ( var i=all.length; i--; ) {
				if ( all[i].className == classText && all[i].nodeType == 1 ) {
					nodes.push( all[i] );
				}
			}

			return nodes;

		}

	}

	//添加事件
	function addEvent ( node, e, fn ) {

		if ( node.addEventListener ) {
			node.addEventListener( e, fn );	
		} else if (node.attachEvent ) {
			node.attachEvent( "on" + e, fn );
		} else {
			return false;
		}

	}

	//是否有类
	function hasClass ( node, classText ) {

		var classNameText = node.className,
			classArr = classNameText.split(" ");

		if ( classArr.indexOf( classText ) == -1 ) {
			return false;
		} else {
			return true;
		}

	}

	//添加类
	function addClass ( node, classText ) {

		if ( !hasClass( node, classText ) ) {
			node.className += " " + classText;
		}

	}

	//删除类
	function removeClass ( node, classText ) {

		if ( hasClass( node, classText ) ) {
			node.className = node.className.split(" ").join("|").replace(/^(.*)$/g,"|$1|").replace("|"+classText+"|","|").replace(/^|(.*)|$/g,"$1").replace("|"," ");
		}

	}


	module.exports = {
		init: init
	}


});