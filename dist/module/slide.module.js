define(function(e,t,n){var r=e("underscore"),i=e("jquery");t.config={};var s={slideDOM:""},o={speed:2e3,pageDOM:null,pageNum:!1,pageThumb:!1,animation:"fade",cutover:!1},u=function(){if(r.isEqual(o,t.config))return!1;r.extend(o,t.config),t.config=o;try{r.each(s,function(e,n){if(!r.has(t.config,n))throw new Error("Slide模块未配置"+n)})}catch(e){window.console!==undefined?console.error(e.message):alert(e.message)}},a=!0,f,l=-1,c,h;t.play=function(e){clearTimeout(f);if(e===undefined)return l===t.slideLength-1?t.play(0):(l+=1,t.play(l)),!1;l=Math.abs(e),t.config.animation==="fade"?(c.fadeOut("slow"),c.eq(l).stop().fadeIn("slow")):t.config.animation==="callBackFade"?c.fadeOut("fast",function(){c.eq(l).fadeIn("fast")}):(c.hide(),c.eq(l).show()),h&&(h.removeClass("on"),h.eq(l).addClass("on")),l===0&&t.config.cutover?(i(t.config.pageDOM).find(".prev").addClass("beginning"),i(t.config.pageDOM).find(".next").removeClass("end")):l===t.slideLength-1&&t.config.cutover?(i(t.config.pageDOM).find(".next").addClass("end"),i(t.config.pageDOM).find(".prev").removeClass("beginning")):(i(t.config.pageDOM).find(".prev").removeClass("beginning"),i(t.config.pageDOM).find(".next").removeClass("end")),a&&(f=setTimeout(function(){t.play()},t.config.speed))},t.pause=function(){a?(a=!1,clearTimeout(f)):(a=!0,t.play())},t.next=function(){l!==t.slideLength-1&&(l+=1),t.play(l)},t.prev=function(){l!==0&&(l-=1),t.play(l)},t.cutCell=function(e){if(e<=0)return 0;console.log(t.slideLength%e)},t.init=function(){u(),t.slideLength=i(t.config.slideDOM).find(">li").size(),c=i(t.config.slideDOM).find(">li");if(t.config.pageDOM!==null&&t.slideLength>1){var e;c.each(function(n){t.config.pageNum?e='<li><a class="slide-page-cell" page="'+n+'">'+n+"</a></li>":t.config.pageThumb?e='<li><a class="slide-page-cell" page="'+n+'"><img src="'+i(this).find("img").attr("src")+'" /></a></li>':e='<li><a class="slide-page-cell" page="'+n+'"></a></li>',i(t.config.pageDOM).append(e)}),t.config.cutover&&(i(t.config.pageDOM).prepend('<li><a class="prev"></a></li>'),i(t.config.pageDOM).append('<li><a class="next"></a></li>'),i(t.config.pageDOM).find(".next").click(function(){t.next()}),i(t.config.pageDOM).find(".prev").click(function(){t.prev()})),h=i(t.config.pageDOM).find("li"),h.each(function(){var e=i(this).find("a.slide-page-cell").attr("page");i(this).click(function(){t.play(e)})})}t.play()}});