/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board/oftenAskList.ts":
/*!***********************************!*\
  !*** ./src/board/oftenAskList.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var boardTitleText = document.querySelectorAll('.board-title-text');\nboardTextToggle();\n\nfunction boardTextToggle() {\n  var current = null;\n\n  var _loop = function _loop(i) {\n    boardTitleText[i].addEventListener('click', function () {\n      if (current !== i) {\n        if (current !== null) {\n          boardTitleText[current].parentElement.nextElementSibling.classList.add('none');\n        }\n\n        boardTitleText[i].parentElement.nextElementSibling.classList.remove('none');\n      } else {\n        if (boardTitleText[i].parentElement.nextElementSibling.classList.contains('none')) {\n          boardTitleText[i].parentElement.nextElementSibling.classList.remove('none');\n        } else {\n          boardTitleText[i].parentElement.nextElementSibling.classList.add('none');\n        }\n      }\n\n      current = i;\n    });\n  };\n\n  for (var i = 0; i < boardTitleText.length; i++) {\n    _loop(i);\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYm9hcmQvb2Z0ZW5Bc2tMaXN0LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkL29mdGVuQXNrTGlzdC50cz9iMzJiIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBib2FyZFRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC10aXRsZS10ZXh0Jyk7XG5ib2FyZFRleHRUb2dnbGUoKTtcblxuZnVuY3Rpb24gYm9hcmRUZXh0VG9nZ2xlKCkge1xuICB2YXIgY3VycmVudCA9IG51bGw7XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuICAgIGJvYXJkVGl0bGVUZXh0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGN1cnJlbnQgIT09IGkpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICBib2FyZFRpdGxlVGV4dFtjdXJyZW50XS5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2FyZFRpdGxlVGV4dFtpXS5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYm9hcmRUaXRsZVRleHRbaV0ucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdub25lJykpIHtcbiAgICAgICAgICBib2FyZFRpdGxlVGV4dFtpXS5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9hcmRUaXRsZVRleHRbaV0ucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgPSBpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYm9hcmRUaXRsZVRleHQubGVuZ3RoOyBpKyspIHtcbiAgICBfbG9vcChpKTtcbiAgfVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/board/oftenAskList.ts\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/board/oftenAskList.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/board/oftenAskList.ts */"./src/board/oftenAskList.ts");


/***/ })

/******/ });