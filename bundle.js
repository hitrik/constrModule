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

	var _button = __webpack_require__(2);

	var _toolbar = __webpack_require__(5);

	var btn = new _button.Button("Constructor");
	var toolbar = new _toolbar.Toolbar();
	var inject = new _content_script.Inject();

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

	        this.file = null;
	        this.type = null;
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Button = undefined;

	var _template = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utils = new _utils.Utils();

	var Button = exports.Button = function Button(text) {
	    _classCallCheck(this, Button);

	    this.text = text;
	    var btn = new _template.Template("div", "<div class=\"btn_constr\">" + this.text + "</div>");
	    utils.insertToDOM(btn).addEvent("click", btn, function () {
	        console.log("click");
	    });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = exports.Utils = function () {
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Toolbar = undefined;

	var _template = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tplToolbar = "\n<div class=\"toolbar_constr c_hide\">\n    <div class=\"toolbar_constr__container\">\n        <input type=\"file\" name=\"file_constr\" id=\"file_constr\" />\n        <button id=\"btn_constr\">Load file</button>\n    </div>\n</div>\n";

	var Toolbar = exports.Toolbar = function Toolbar() {
	    _classCallCheck(this, Toolbar);

	    return new _template.Template("div", tplToolbar);
	};

/***/ }
/******/ ]);