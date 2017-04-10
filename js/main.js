/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = ((loadJSON, renderPics) => {
	 	var API_URL = 'https://api.vk.com/method/photos.get?';
	 	var ownerId;
	
	 	var showButton = document.querySelector('.form-show__btn');
	 	var ownreIdInput = document.querySelector('.form-show__owner-id-input');
	
	 	ownreIdInput.addEventListener('input', (event) => {
	    event.preventDefault();
	 		var evt = event.target;
	 		ownerId = evt.value;
	 	});
	
	 	var filters = document.querySelector('.filters');
	  var filterId = 'filter-new';
	
	  filters.addEventListener('click', (event) => {
		  event.preventDefault();
	    var evt = event.target;
	
	    if(evt.className === 'filters__likes') {
	      filterId = 'filter-popular';
	      var evnt = new Event("click");
	  	  showButton.dispatchEvent(evnt);
	    }
	    if(evt.className === 'filters__comments') {
	      filterId = 'filter-discussed';
	      var evnt = new Event("click");
	  	  showButton.dispatchEvent(evnt);
	    }
	    if(evt.className === 'filters__newest') {
	      filterId = 'filter-new';
	      var evnt = new Event("click");
	  	  showButton.dispatchEvent(evnt);
	    }
	  });
	
	 	showButton.addEventListener('click', (event) => {
	 		event.preventDefault();
	 		if(!ownerId) {
	 			alert('Input owner ID!');
	 		} else {
	 			var imgNodes = document.querySelectorAll('.picture');
	 			if(imgNodes) {
	 				imgNodes.forEach((node) => {
	 					node.remove();
	 				});
	 			}
	      filters.classList.remove('invisible');
	 			loadJSON(API_URL, renderPics, ownerId, filterId);
	 		}
	 	});
	}), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = ((renderPics) => {
	  var cbName = 'cb',
	      API_URL = 'https://api.vk.com/method/photos.get?',
	      COUNT = 50,
	      ownerId = 200;
	
	  var filters = (list, filterID) => {
	    var items = list.response.items;
	    switch(filterID) {
	      case 'filter-popular': {
	        items.sort(function(a, b){
	          return b.likes.count - a.likes.count;
	        });
	        break;
	      }
	      case 'filter-new': {
	        items.sort(function(a, b){
	          return b.date - a.date;
	        });
	        break;
	      }
	      case 'filter-discussed': {
	        items.sort(function(a, b){
	        return b.comments.count - a.comments.count;
	        });
	        break;
	      }
	    }
	    return list;
	  }
	
	  var loadJSON = (url, callback, ownerId, filterId) => {
	    window[cbName] = function(data) {
	      if(data.error) {
	        alert(data.error.error_msg);
	      } else {
	          if(data.response.count === 0) {
	            alert('User dont have any images on the wall.');
	          } else {
	            callback(filters(data, filterId));
	          }
	      }
	    };
	
	    var script = document.createElement('script');
	    script.src = url + 'owner_id='+ ownerId + '&album_id=wall&extended=1&rev=1&v=5.52' + '&count=' + COUNT + '&callback=' + cbName;
	    document.body.appendChild(script);
	  };
	
	  return loadJSON;
	}), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4),__webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = ((Picture, gallery) => {
	  var picturesContainer = document.querySelector('.pictures-container');
	 
	  var renderPics = (pictures) => {
	    gallery.setPic(pictures);
	    pictures.response.items.forEach(function(pic, i) {
	    	var picElem = new Picture();
	    	picElem.setData(pic);
	      	picturesContainer.appendChild(picElem.addPicsToTemplate());
	      	
	      	picElem.addGalleryEvent(i, pictures);
	    });
	  };
	  return renderPics;
	}), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = ((gallery) => {
	  var template = document.querySelector('#picture-template');
	  var templateContainer = 'content' in template ? template.content : template;
	
	  var picElement = templateContainer.querySelector('.picture');
	
	  function Picture(smallImg, galleryImg, data, likes, comments, nodeClone) {
	    this.smallImg = smallImg;
	    this.galleryImg = galleryImg;
	
	    this.data = data;
	
	    this.likes = likes;
	    this.comments = comments;
	    this.nodeClone = nodeClone;
	  }
	
	  Picture.prototype.setData = (pic) => {
	    this.smallImg = pic.photo_130;
	    this.galleryImg = pic.photo_604;
	
	    this.data = pic.data;
	
	    this.likes = pic.likes.count;
	    this.comments = pic.comments.count;
	  }
	
	  Picture.prototype.addPicsToTemplate = () => {
	    this.nodeClone = picElement.cloneNode(true);
	
	    this.nodeLikes = this.nodeClone.querySelector('.picture__likes');
	    this.nodeComments = this.nodeClone.querySelector('.picture__comments');
	
	    this.nodeLikes.textContent = this.likes;
	    this.nodeComments.textContent = this.comments;
	
	    var img = new Image();
	    var self = this.nodeClone;
	
	    img.onload = (evt) => {
	      var nodeImg = self.querySelector('img');
	
	      nodeImg.src = evt.target.src;
	    };
	
	    img.onerror = () => {
	      console.log('Img load error!');
	    };
	
	    img.src = this.smallImg;
	
	    return this.nodeClone;
	  }
	
	  Picture.prototype.addGalleryEvent = (i, pictures) => {
	    var self = this;
	    self.nodeClone.onclick = function(event) {
	        event.preventDefault();
	
	        function wrap(i, pictures) {
	          gallery.show(i, pictures)
	        };
	        wrap(i, pictures);
	    };
	  }
	  return Picture;
	}), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_FACTORY__ = (() => {
		var galleryOverlay = document.querySelector('.gallery-overlay');
		var galleryOverlayImage = document.querySelector('.gallery-overlay__image');
	
	  var likes =  document.querySelector('.likes');
	  var comments =  document.querySelector('.comments');
	  var date =  document.querySelector('.data');
	
		function Gallery(pictures, photoId) {
		}
	
	  Gallery.prototype.setPic = (pic) => {
	    this.pic = pic;
	
	    this.rArrow = document.querySelector('.right');
	    this.lArrow = document.querySelector('.left');
	  }
	
		Gallery.prototype.show = (num, pictures) => {
	    var self = this;
	
	    function setPic(num, pictures) {
			  galleryOverlay.classList.remove('invisible');
	      galleryOverlayImage.setAttribute('src', pictures.response.items[num].photo_604);
	      likes.textContent = pictures.response.items[num].likes.count;
	      comments.textContent = pictures.response.items[num].comments.count;
	
	      function formatDate(date) {
	        var dd = date.getDate();
	        if (dd < 10) dd = '0' + dd;
	
	         var mm = date.getMonth() + 1;
	         if (mm < 10) mm = '0' + mm;
	
	        var yy = date.getFullYear() % 100;
	        if (yy < 10) yy = '0' + yy;
	
	        return dd + '.' + mm + '.' + yy;
	      }
	      var d = new Date(pictures.response.items[num].date * 1000)
	      date.textContent = formatDate(d);
	    }
	
	    setPic(num, pictures);
	
	    function closeGallery() {
	      galleryOverlay.classList.add('invisible');
	    }
	
	    function next() {
	      num++;
	      if(num === pictures.response.items.length) {
	        num = 0;
	      }
	      setPic(num, pictures);
	    }
	
	    function prev() {
	      if(num === 0) {
	        num =  + pictures.response.items.length - 1;
	      }
	      num--;
	      setPic(num, pictures);
	    }
	
	    document.addEventListener('click', (event) => {
	      event.preventDefault();
	      var evt = event.target;
	
	      if(evt.className === galleryOverlay.className) {
	        closeGallery();
	      }
	    });
	
	    this.rArrow.onclick = function() {
	      next();
	    };
	    
		  document.addEventListener('keydown', (event) => {
	      var evt = event.keyCode;
	
	      if(evt === 27) {
	        closeGallery();
	      }
	      if(evt === 37) {
	        prev();
	      }
	      if(evt === 39) {
	        next();
	      }
	    }); 
	
	    this.lArrow.onclick = function() {
	      prev();
	    };
	  };
	  return new Gallery();
	}), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map?dropcache