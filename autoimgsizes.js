/*
 * Aiysea 图片的处理
 *
 * 本处理主要是利用七牛现有的 API 资源进行图片的最佳展示处理，主要利用七牛的 imageMogr2/ 这个 API，而却七牛对于这个请求是有缓存的，所以读取速度灰常快。
 * 原理是根据容器的大小对原始图片进行扩大或者缩小后再裁剪容器大小的图片
 *
 * 目前该方式还是不够完美，不能自定义属性，正逐步完善
 *
 * Img 设置参数
 * autoImgSizeConfig{
 * 		data-src 			// 原图片大小
 * 		data-auto 			// auto 表示按宽度等比例拉伸或缩小
 * 		data-origin-size 	// 原始图片大小，数据格式为 widthxheight
 * 		class name  		// autoImgSizes
 * }
 * 
 * Create By Zacks
 * 2015-11-25
 */
(function( window, document, undefined ) {
	// Enable strict mode
	"use strict";
	if(!document.getElementsByClassName){return;}

	var autoImgSizeConfig;

	var regImg = /^img$/i;

	var	DPR = 1;
	if (window.devicePixelRatio) {
		DPR = window.devicePixelRatio;
	}

	var originSize;


	var checkElem = function(elem,isReset){
		if (!regImg.test(elem.nodeName)) {return;}

		// 是否重新刷新 UI
		if (isReset) {
			elem.setAttribute("src","");
		}else if (elem.getAttribute("src")!=null && elem.getAttribute("src").length > 0) {
			// 防止重复设置
			return;
		}

		// 防止不是网络图片，就不判断是否是七牛的啦，毕竟七牛可以自定义HOST
		if (!elem.getAttribute(autoImgSizeConfig.srcAttr) || elem.getAttribute(autoImgSizeConfig.srcAttr).indexOf("http") != 0) {
			
			return;
		}
		// 获取当前图片的原始尺寸
		if (elem.getAttribute(autoImgSizeConfig.originSizeAttr)) {
			var sizes = elem.getAttribute(autoImgSizeConfig.originSizeAttr).split("x");
			originSize = {};
			originSize.width = parseFloat(sizes[0]);
			originSize.height = parseFloat(sizes[1]);
		}else{
			return;
		}

		// if (elem.getAttribute('data-small-size')) {
		// 	var sizes = elem.getAttribute('data-small-size').split("x");
		// 	smallSize = {};
		// 	smallSize.width = parseFloat(sizes[0])*DPR;
		// 	smallSize.height = parseFloat(sizes[1])*DPR;
		// }

		// if (elem.getAttribute('data-middle-size')) {
		// 	var sizes = elem.getAttribute('data-middle-size').split("x");
		// 	middleSize = {};
		// 	middleSize.width = parseFloat(sizes[0])*DPR;
		// 	middleSize.height = parseFloat(sizes[1])*DPR;
		// }

		// if (elem.getAttribute('data-large-size')) {
		// 	var sizes = elem.getAttribute('data-large-size').split("x");
		// 	largeSize = {};
		// 	largeSize.width = parseFloat(sizes[0])*DPR;
		// 	largeSize.height = parseFloat(sizes[1])*DPR;
		// }

		// var currentSize = largeSize;
		// if (window.innerWidth < 768) {

		// 	currentSize = smallSize;

  		// }else if(window.innerWidth < 992){

  		//  currentSize = middleSize;

  		// }

  		// 获取父类容器的大小
		var rect = elem.parentNode.getBoundingClientRect();
		if (rect.width==0) {
			return;
		}

		var currentSize = {width:rect.width*DPR,height:rect.height*DPR};


		var imgURL = "?imageMogr2/";

		if (elem.getAttribute(autoImgSizeConfig.autoAttr) == "auto") {

			imgURL += "thumbnail/"+currentSize.width+"x";

		}else{

			// 判断其图片原始尺寸与容器尺寸的长宽比
			if (originSize.width/originSize.height>currentSize.width/currentSize.height) {

				// 长宽比大于容器，则按比例扩大或缩小图片 
	        	imgURL += "thumbnail/x"+currentSize.height;

			}else{

				// 长宽比小于容器，则按比例扩大或缩小图片 
	        	imgURL += "thumbnail/"+currentSize.width+"x";

			}

			// 然后居中裁剪容器大小的图片
			imgURL += "/gravity/Center/crop/"+currentSize.width+"x"+currentSize.height;

			// 设置图片的高度
			elem.style.height = currentSize.height/DPR + "px";
		}

        // 设置最终图片URL
		elem.setAttribute("src",elem.getAttribute(autoImgSizeConfig.srcAttr)+imgURL);
		// 设置图片的宽度
		elem.style.width = currentSize.width/DPR + "px";
	};

	var fectchElements = function(isReset){
		var autoImageElems = document.getElementsByClassName(autoImgSizeConfig.autoImgClass);
		var length = autoImageElems.length;

		if (length) {
			for (var i = 0; i < length; i++) {
				if(!autoImageElems[i]){continue;}

				checkElem(autoImageElems[i],isReset);

			}
		}
	};

	var loader = function(){
		fectchElements(false);
	};

	var refreshElements = function(){

		fectchElements(true);

	};

	(function(){
		var prop;
		var autoImgSizeConfigDefault = {
			srcAttr: "data-src",
			autoAttr : "data-auto", // value: auto
			originSizeAttr : "data-origin-size",
			autoImgClass : "autoImgSizes"
		}

		autoImgSizeConfig = window.autoImgSizeConfig || window.autoImgSizeConfig || {};

		for(prop in autoImgSizeConfigDefault){
			if(!(prop in autoImgSizeConfig)){
				autoImgSizeConfig[prop] = autoImgSizeConfigDefault[prop];
			}
		}

		loader();

		// window resize listener
		window.addEventListener("resize",function() {

	    	refreshElements();

	    },true)

		// window scroll listener
	    window.addEventListener("scroll",function() {

	    	loader();

	    },true)

	    // document DOMNodeInserted listener
		document.documentElement.addEventListener('DOMNodeInserted', function() {

	    	loader();

	    }, true);
	    
	    // document DOMAttrModified listener
		document.documentElement.addEventListener('DOMAttrModified', function() {

	    	loader();

	    }, true);


	})();

} )( window, document );
