/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _content_script = __webpack_require__(1);

	var _event_controller = __webpack_require__(2);

	var inject = new _content_script.Inject();
	var ctrl = new _event_controller.Controller();

	var cssFile = inject.getFromExtension("./css/constr_style.css");
	var jsFile = inject.getFromExtension("./content_scripts/js/test.js");

	var mockDataCSS = {
	    type: "css",
	    file: cssFile
	};
	var mockDataJS = {
	    type: "js",
	    file: jsFile
	};

	inject.insertResource(mockDataCSS).insertResource(mockDataJS, function () {
	    console.log("js loaded.");
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Inject = exports.Inject = function () {
	    function Inject() {
	        _classCallCheck(this, Inject);

	        this.file;
	        this.type;
	        this.store = [];
	    }

	    _createClass(Inject, [{
	        key: "getStore",
	        value: function getStore() {
	            return this.store;
	        }
	    }, {
	        key: "getFromExtension",
	        value: function getFromExtension(path) {
	            if (path) {
	                return chrome.extension.getURL(path);
	            }
	        }
	    }, {
	        key: "setStore",
	        value: function setStore(obj) {
	            this.store.length = 0;
	            return this.store.push(obj);
	        }
	    }, {
	        key: "insertResource",
	        value: function insertResource(obj, callback) {
	            if (!obj) {
	                throw new Error("require object argument for insertResource");
	            }
	            var head = document.querySelector("head");
	            var resource = null;
	            switch (obj.type) {
	                case "css":
	                    resource = document.createElement("link");
	                    resource.rel = "stylesheet";
	                    resource.href = obj.file;
	                    break;
	                case "js":
	                    resource = document.createElement("script");
	                    resource.src = obj.file;
	                    break;
	                default:
	                    return false;
	            }
	            if (head) {
	                head.appendChild(resource);
	                resource.addEventListener("load", callback && callback() || function () {}, false);
	            }
	            return this;
	        }
	    }]);

	    return Inject;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Controller = undefined;

	var _utils = __webpack_require__(3);

	var _load_image = __webpack_require__(4);

	var _load_image2 = _interopRequireDefault(_load_image);

	var _button = __webpack_require__(6);

	var _toolbar = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vent = __webpack_require__(9);

	window.vent = new Vent();

	var Controller = exports.Controller = function () {
	    function Controller() {
	        _classCallCheck(this, Controller);

	        this.btn = new _button.Button("Constructor");
	        this.toolbar = new _toolbar.Toolbar().tpl;
	        this.initEvent();
	    }

	    _createClass(Controller, [{
	        key: "initEvent",
	        value: function initEvent() {
	            var _this = this;

	            _utils.utils.insertToDOM(this.btn).addEvent("click", this.btn, function () {
	                _utils.utils.insertToDOM(_this.toolbar);
	                _this.toolbar.querySelector(".toolbar_constr").classList.remove("c_hide");
	            });
	            _utils.utils.addEvent("click", this.toolbar.querySelector("#btn_constr_file"), function (e) {
	                e.preventDefault();
	                console.log("click btn save");
	            });
	            _utils.utils.addEvent("change", this.toolbar.querySelector("#file_constr"), function () {
	                var file = this.files[0];
	                var loadFile = new _load_image2.default(file);
	            });
	        }
	    }]);

	    return Controller;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, [{
	        key: "insertToDOM",
	        value: function insertToDOM(elem) {
	            var body = document.body;
	            if (body) {
	                body.appendChild(elem);
	            } else console.log("can\'t find body on the page");
	            return this;
	        }
	    }, {
	        key: "addEvent",
	        value: function addEvent(type, elem, fn) {
	            elem.addEventListener(type, fn, false);
	            return this;
	        }
	    }, {
	        key: "getElem",
	        value: function getElem(selector) {
	            return document.querySelector(selector);
	        }
	    }, {
	        key: "removeEvent",
	        value: function removeEvent(type, elem, fn) {
	            elem.removeEventListener(type, fn, false);
	            return this;
	        }
	    }, {
	        key: "createNode",
	        value: function createNode(tag, options, content) {
	            var elem = document.createElement(tag);
	            elem.textContent = content;
	            if (options) {
	                for (var item in options) {
	                    if (options.hasOwnProperty(item)) {
	                        elem.setAttribute(item, options[item]);
	                    }
	                }
	            }
	            return elem;
	        }
	    }]);

	    return Utils;
	}();

	var utils = new Utils();
	exports.utils = utils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _canvas_draw = __webpack_require__(5);

	var _canvas_draw2 = _interopRequireDefault(_canvas_draw);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Process loaded file(image only) from constructor
	 * @class
	 * @param { file } object - file from input[type=file] provide by HTML5 FileAPI
	 * */

	var LoadImage = function () {
	    function LoadImage(file) {
	        _classCallCheck(this, LoadImage);

	        this.file = file;
	        this.prepareAPI();
	    }

	    _createClass(LoadImage, [{
	        key: "prepareAPI",
	        value: function prepareAPI() {
	            var reader = new FileReader();
	            reader.onload = this.onSuccess;
	            reader.onerror = this.onError;
	            reader.onprogress = function () {
	                //TODO spinner
	            };
	            reader.readAsDataURL(this.file);
	        }
	    }, {
	        key: "onSuccess",
	        value: function onSuccess(e) {
	            this.base46Image = e.target.result;
	            var canvas_draw = new _canvas_draw2.default(this.base46Image);
	            console.log("base64 image", canvas_draw);
	        }
	    }, {
	        key: "onError",
	        value: function onError() {
	            console.log("error on convert");
	        }
	    }]);

	    return LoadImage;
	}();

	exports.default = LoadImage;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Draw image on canvas from image converted to base64
	 * @class
	 * @param {base64data} String - base64 string, encoded image loaded from form constructor
	 */

	var Canvas = function () {
	    function Canvas(base64data) {
	        var _this = this;

	        _classCallCheck(this, Canvas);

	        this.base64data = base64data;
	        this.canvas = this.createCanvas();
	        this.drawCanvas(this.canvas).then(function () {
	            _this.getColors(_this.canvas, 45);
	        }).catch(function (err) {
	            console.log(err);
	        });
	    }

	    _createClass(Canvas, [{
	        key: "createCanvas",
	        value: function createCanvas() {
	            var widthOfScroll = 17;
	            var canvas = _utils.utils.createNode("canvas", {
	                id: "constructor_canvas"
	            });
	            canvas.width = window.innerWidth - widthOfScroll;
	            canvas.height = window.innerHeight;
	            _utils.utils.insertToDOM(canvas);
	            return canvas;
	        }
	    }, {
	        key: "drawCanvas",
	        value: function drawCanvas(canvas) {
	            var _this2 = this;

	            return new Promise(function (resolve, reject) {
	                var ctx = canvas.getContext("2d");
	                var image = new Image();
	                image.onload = function () {
	                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
	                    resolve();
	                };
	                image.onerror = function () {
	                    reject();
	                };
	                image.src = _this2.base64data;
	            });
	        }
	    }, {
	        key: "getColors",
	        value: function getColors(canvas, blockSize) {
	            var blockSize = blockSize,
	                defaultRGB = { r: 0, g: 0, b: 0 },
	                context = canvas.getContext('2d'),
	                data,
	                width,
	                height,
	                i = -4,
	                length,
	                rgb = { r: 0, g: 0, b: 0 },
	                count = 0;

	            if (!context) {
	                return defaultRGB;
	            }

	            height = canvas.height;
	            width = canvas.width;

	            try {
	                data = context.getImageData(0, 0, width, height);
	            } catch (e) {
	                /* security error, img on diff domain */
	                return defaultRGB;
	            }

	            length = data.data.length;

	            while ((i += blockSize * 4) < length) {
	                ++count;
	                rgb.r += data.data[i];
	                rgb.g += data.data[i + 1];
	                rgb.b += data.data[i + 2];
	            }

	            // ~~ used to floor values
	            rgb.r = ~ ~(rgb.r / count);
	            rgb.g = ~ ~(rgb.g / count);
	            rgb.b = ~ ~(rgb.b / count);

	            console.log(rgb);
	            return rgb;
	        }
	    }]);

	    return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.Button = undefined;

	var _template = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = exports.Button = function Button(text) {
	   _classCallCheck(this, Button);

	   this.text = text;
	   return new _template.Template("div", "<div class=\"btn_constr\">" + this.text + "</div>");
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Compile template from string, use es6 interpolate string
	 * @class
	 * @param {string} tag - container, where will be inserted compiled template
	 * @param {string} templateStr - template for compile
	 * */

	var Template = exports.Template = function () {
	    function Template(tag, templateStr) {
	        _classCallCheck(this, Template);

	        this.tpl = templateStr;
	        this.tag = tag;
	        return this.createContainer(this.tag, this.tpl);
	    }

	    _createClass(Template, [{
	        key: "createContainer",
	        value: function createContainer(tag, template) {
	            var container = document.createElement(tag);
	            container.innerHTML = template;
	            return container;
	        }
	    }]);

	    return Template;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Toolbar = undefined;

	var _template = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tplToolbar = "\n<div class=\"toolbar_constr c_hide\">\n    <div class=\"toolbar_constr__container\">\n        <input type=\"file\" name=\"file_constr\" id=\"file_constr\" />\n        <div class=\"toolbar_constr_colors\">\n            <div class=\"toolbar_constr_color\">\n                <div class=\"colors__color_top\"></div>\n                <div class=\"colors_color_bottom\"></div>\n            </div>\n        </div>\n        <button id=\"btn_constr_file\">Save</button>\n    </div>\n</div>\n";

	var Toolbar = exports.Toolbar = function Toolbar() {
	    _classCallCheck(this, Toolbar);

	    this.tpl = new _template.Template("div", tplToolbar);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	/**
	 * MicroEvent - to make any js object an event emitter (server or browser)
	 * 
	 * - pure javascript - server compatible, browser compatible
	 * - dont rely on the browser doms
	 * - super simple - you get it immediatly, no mistery, no magic involved
	 *
	 * - create a MicroEventDebug with goodies to debug
	 *   - make it safer to use
	*/

	var MicroEvent = function MicroEvent() {};
	MicroEvent.prototype = {
		bind: function bind(event, fct) {
			this._events = this._events || {};
			this._events[event] = this._events[event] || [];
			this._events[event].push(fct);
		},
		unbind: function unbind(event, fct) {
			this._events = this._events || {};
			if (event in this._events === false) return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		trigger: function trigger(event /* , args... */) {
			this._events = this._events || {};
			if (event in this._events === false) return;
			for (var i = 0; i < this._events[event].length; i++) {
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	/**
	 * mixin will delegate all MicroEvent.js function in the destination object
	 *
	 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
	 *
	 * @param {Object} the object which will support MicroEvent
	*/
	MicroEvent.mixin = function (destObject) {
		var props = ['bind', 'unbind', 'trigger'];
		for (var i = 0; i < props.length; i++) {
			destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
		}
	};

	// export in common js
	if (typeof module !== "undefined" && 'exports' in module) {
		module.exports = MicroEvent;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }
/******/ ]);