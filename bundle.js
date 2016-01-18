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

	var btn = new _button.Button("Constr");
	var inject = new _content_script.Inject();

	var cssFile = chrome.extension.getURL("./css/constr_style.css");

	var mockData = {
	    type: "js",
	    file: cssFile
	};

	inject.insertResource(mockData);

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
	        key: "setStore",
	        value: function setStore(obj) {
	            this.store.length = 0;
	            return this.store.push(obj);
	        }
	    }, {
	        key: "insertResource",
	        value: function insertResource(obj) {
	            if (!obj) {
	                throw new Error("require object argument, insertResource");
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
	                resource.addEventListener("load", function () {
	                    console.log("resource is loaded");
	                }, false);
	            }
	        }
	    }]);

	    return Inject;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Button = exports.Button = function () {
	    function Button(text) {
	        _classCallCheck(this, Button);

	        this.text = text;
	        this.insertToDOM(this.createNode("div", {
	            "class": "btn_constr"
	        }, "Constr"));
	    }

	    _createClass(Button, [{
	        key: "createNode",
	        value: function createNode(tag, options, content) {
	            var elem = document.createElement(tag);
	            elem.textContent = content;
	            if (options) {
	                for (var item in options) {
	                    elem.setAttribute(item, options[item]);
	                }
	            }
	            return elem;
	        }
	    }, {
	        key: "addEvent",
	        value: function addEvent(elem) {
	            elem.addEventListener("click", function () {
	                console.log("click  btn constr");
	            }, false);
	        }
	    }, {
	        key: "insertToDOM",
	        value: function insertToDOM(elem) {
	            var body = document.body;
	            if (body) {
	                body.appendChild(elem);
	            } else console.log("can\'t find body on the page");
	            this.addEvent(elem);
	        }
	    }]);

	    return Button;
	}();

/***/ }
/******/ ]);