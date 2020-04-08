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

/***/ "./src/base/headerHover.ts":
/*!*********************************!*\
  !*** ./src/base/headerHover.ts ***!
  \*********************************/
/*! exports provided: mqInit, menuInfoToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mqInit\", function() { return mqInit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"menuInfoToggle\", function() { return menuInfoToggle; });\nvar menuTitleArr = Array.from(document.querySelectorAll('.mid-nav-menu >li > a'));\nvar menuListArr = Array.from(document.querySelectorAll('.hover-menu-container > ul'));\nvar mqMobile = window.matchMedia(\"(max-width: 767px)\");\nvar clickMenuBox = document.querySelectorAll('.click-menu-box'); //사이드 메뉴 배열\n\nvar menu = document.querySelector('.click-menu-container');\nvar menuInfoText = document.querySelector('.mid-nav-info-text');\nvar menuInfo = document.querySelector('.mid-nav-info');\nvar menuTitleQna = document.querySelector('#qna-anchor');\nvar logo = document.querySelector('#logo');\nfunction mqInit() {\n  var menuTitleEventHandler = [];\n  var menuTitleQnaEvent;\n  var menuExceptEvent;\n  var menuEvent;\n  var current = null;\n\n  if (mqMobile.matches) {\n    //모바일 레이아웃\n    mqMobileInit();\n  } else {\n    //데스크탑 레이아웃\n    mqDeskTopInit();\n  }\n\n  mqMobile.addListener(mqFunc);\n\n  function mqMobileInit() {\n    logo.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyAQMAAACEQrBZAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABFJREFUeNpjYBgFo2AUDHcAAAPoAAHOSUxYAAAAAElFTkSuQmCC');\n    menu.classList.remove('none');\n    menuTitleQna.setAttribute('href', '#');\n    var isMenuClick = false;\n    menuTitleArr.forEach(function (node, index) {\n      var event = function event(e) {\n        if (current !== null) {\n          clickMenuBox[current].classList.add('none');\n        }\n\n        switch (index) {\n          case 0:\n            document.querySelector('.click-menu-introduce').classList.remove('none');\n            current = 0;\n            break;\n\n          case 1:\n            document.querySelector('.click-menu-system').classList.remove('none');\n            current = 1;\n            break;\n\n          case 2:\n            document.querySelector('.click-menu-statistics').classList.remove('none');\n            current = 2;\n            break;\n\n          case 3:\n            document.querySelector('.click-menu-community').classList.remove('none');\n            current = 3;\n            break;\n        }\n\n        menu.style.borderBottom = \"1px solid #09538e\";\n        e.stopPropagation();\n      };\n\n      menuTitleEventHandler.push(event);\n      node.addEventListener('click', event);\n    });\n\n    menuTitleQnaEvent = function menuTitleQnaEvent(e) {\n      if (current !== null) {\n        clickMenuBox[current].classList.add('none');\n      }\n\n      document.querySelector('.click-menu-qna').classList.remove('none');\n      current = 4;\n      e.stopPropagation();\n    };\n\n    menuTitleQna.addEventListener('click', menuTitleQnaEvent);\n\n    menuExceptEvent = function menuExceptEvent() {\n      if (!isMenuClick) {\n        //target 다른 곳\n        if (current !== null) {\n          clickMenuBox[current].classList.add('none');\n          menu.style.borderBottom = \"none\";\n        }\n      }\n\n      isMenuClick = false;\n    };\n\n    document.addEventListener('click', menuExceptEvent);\n\n    menuEvent = function menuEvent() {\n      //target\n      isMenuClick = true;\n    };\n\n    menu.addEventListener('click', menuEvent);\n  }\n\n  function mqFunc(mediaQuery) {\n    if (mediaQuery.matches) {\n      //모바일 레이아웃\n      menuHoverRemoveEvent();\n      mqMobileInit();\n    } else {\n      //데스크탑 레이아웃\n      if (current !== null) {\n        clickMenuBox[current].classList.add('none');\n      }\n\n      menuTitleArr.forEach(function (node, index) {\n        node.removeEventListener('click', menuTitleEventHandler[index]);\n      });\n      menuTitleEventHandler = [];\n      menuTitleQna.removeEventListener('click', menuTitleQnaEvent);\n      document.removeEventListener('click', menuExceptEvent);\n      menu.removeEventListener('click', menuEvent);\n      mqDeskTopInit();\n    }\n  }\n}\n;\n\nfunction menuHoverAddEvent() {\n  var current = null;\n  menuTitleArr.forEach(function (node, index) {\n    node.addEventListener('mouseover', function () {\n      if (current !== null) {\n        menuListArr[current].classList.add('none');\n      }\n\n      menuListArr[index].classList.remove('none');\n      current = index;\n    });\n    node.addEventListener('mouseout', function () {\n      menuListArr[index].classList.add('none');\n    });\n  });\n  menuListArr.forEach(function (node, index) {\n    node.addEventListener('mouseover', function () {\n      if (current !== null) {\n        menuListArr[current].classList.add('none');\n      }\n\n      menuListArr[index].classList.remove('none');\n      current = index;\n    });\n    node.addEventListener('mouseout', function () {\n      menuListArr[index].classList.add('none');\n    });\n  });\n}\n\nfunction menuHoverRemoveEvent() {\n  menuTitleArr.forEach(function (node, index) {\n    node.removeEventListener('mouseover', function () {\n      menuListArr[index].classList.remove('none');\n    });\n    node.removeEventListener('mouseout', function () {\n      menuListArr[index].classList.add('none');\n    });\n  });\n  menuListArr.forEach(function (node, index) {\n    node.removeEventListener('mouseover', function () {\n      menuListArr[index].classList.remove('none');\n    });\n    node.removeEventListener('mouseout', function () {\n      menuListArr[index].classList.add('none');\n    });\n  });\n}\n\nfunction mqDeskTopInit() {\n  logo.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyAQMAAACEQrBZAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABFJREFUeNpjYBgFo2AUDHcAAAPoAAHOSUxYAAAAAElFTkSuQmCC');\n  menu.classList.add('none');\n  menuTitleQna.setAttribute('href', '/board/qna/list.html');\n  menuHoverAddEvent();\n}\n\nfunction menuInfoToggle() {\n  var flag = false;\n  menuInfoText.addEventListener('click', function (e) {\n    if (!flag) {\n      menuInfo.classList.remove('none');\n    } else {\n      menuInfo.classList.add('none');\n    }\n\n    flag = !flag;\n    e.stopPropagation();\n  });\n  document.addEventListener('click', function () {\n    if (flag) {\n      //target 다른 곳\n      menuInfo.classList.add(\"none\");\n      flag = false;\n    }\n  });\n  menuInfo.addEventListener(\"click\", function (e) {\n    e.stopPropagation();\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFzZS9oZWFkZXJIb3Zlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYXNlL2hlYWRlckhvdmVyLnRzP2E4YTQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1lbnVUaXRsZUFyciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pZC1uYXYtbWVudSA+bGkgPiBhJykpO1xudmFyIG1lbnVMaXN0QXJyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG92ZXItbWVudS1jb250YWluZXIgPiB1bCcpKTtcbnZhciBtcU1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY3cHgpXCIpO1xudmFyIGNsaWNrTWVudUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGljay1tZW51LWJveCcpOyAvL+yCrOydtOuTnCDrqZTribQg67Cw7Je0XG5cbnZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLW1lbnUtY29udGFpbmVyJyk7XG52YXIgbWVudUluZm9UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZC1uYXYtaW5mby10ZXh0Jyk7XG52YXIgbWVudUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWlkLW5hdi1pbmZvJyk7XG52YXIgbWVudVRpdGxlUW5hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3FuYS1hbmNob3InKTtcbnZhciBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ28nKTtcbmV4cG9ydCBmdW5jdGlvbiBtcUluaXQoKSB7XG4gIHZhciBtZW51VGl0bGVFdmVudEhhbmRsZXIgPSBbXTtcbiAgdmFyIG1lbnVUaXRsZVFuYUV2ZW50O1xuICB2YXIgbWVudUV4Y2VwdEV2ZW50O1xuICB2YXIgbWVudUV2ZW50O1xuICB2YXIgY3VycmVudCA9IG51bGw7XG5cbiAgaWYgKG1xTW9iaWxlLm1hdGNoZXMpIHtcbiAgICAvL+uqqOuwlOydvCDroIjsnbTslYTsm4NcbiAgICBtcU1vYmlsZUluaXQoKTtcbiAgfSBlbHNlIHtcbiAgICAvL+uNsOyKpO2BrO2DkSDroIjsnbTslYTsm4NcbiAgICBtcURlc2tUb3BJbml0KCk7XG4gIH1cblxuICBtcU1vYmlsZS5hZGRMaXN0ZW5lcihtcUZ1bmMpO1xuXG4gIGZ1bmN0aW9uIG1xTW9iaWxlSW5pdCgpIHtcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnc3JjJywgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSllBQUFBeUFRTUFBQUNFUXJCWkFBQUFBMUJNVkVYLy8vK254QnZJQUFBQUFYUlNUbE1BUU9iWVpnQUFBQkZKUkVGVWVOcGpZQmdGbzJBVURIY0FBQVBvQUFIT1NVeFlBQUFBQUVsRlRrU3VRbUNDJyk7XG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgbWVudVRpdGxlUW5hLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgdmFyIGlzTWVudUNsaWNrID0gZmFsc2U7XG4gICAgbWVudVRpdGxlQXJyLmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICB2YXIgZXZlbnQgPSBmdW5jdGlvbiBldmVudChlKSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xpY2tNZW51Qm94W2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xpY2stbWVudS1pbnRyb2R1Y2UnKS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLW1lbnUtc3lzdGVtJykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgICAgICAgY3VycmVudCA9IDE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1tZW51LXN0YXRpc3RpY3MnKS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgICAgICAgICBjdXJyZW50ID0gMjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLW1lbnUtY29tbXVuaXR5JykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgICAgICAgY3VycmVudCA9IDM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG1lbnUuc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgIzA5NTM4ZVwiO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfTtcblxuICAgICAgbWVudVRpdGxlRXZlbnRIYW5kbGVyLnB1c2goZXZlbnQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50KTtcbiAgICB9KTtcblxuICAgIG1lbnVUaXRsZVFuYUV2ZW50ID0gZnVuY3Rpb24gbWVudVRpdGxlUW5hRXZlbnQoZSkge1xuICAgICAgaWYgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgY2xpY2tNZW51Qm94W2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLW1lbnUtcW5hJykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgY3VycmVudCA9IDQ7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICBtZW51VGl0bGVRbmEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZW51VGl0bGVRbmFFdmVudCk7XG5cbiAgICBtZW51RXhjZXB0RXZlbnQgPSBmdW5jdGlvbiBtZW51RXhjZXB0RXZlbnQoKSB7XG4gICAgICBpZiAoIWlzTWVudUNsaWNrKSB7XG4gICAgICAgIC8vdGFyZ2V0IOuLpOuluCDqs7NcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGlja01lbnVCb3hbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgICAgICAgIG1lbnUuc3R5bGUuYm9yZGVyQm90dG9tID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaXNNZW51Q2xpY2sgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZW51RXhjZXB0RXZlbnQpO1xuXG4gICAgbWVudUV2ZW50ID0gZnVuY3Rpb24gbWVudUV2ZW50KCkge1xuICAgICAgLy90YXJnZXRcbiAgICAgIGlzTWVudUNsaWNrID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1lbnVFdmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBtcUZ1bmMobWVkaWFRdWVyeSkge1xuICAgIGlmIChtZWRpYVF1ZXJ5Lm1hdGNoZXMpIHtcbiAgICAgIC8v66qo67CU7J28IOugiOydtOyVhOybg1xuICAgICAgbWVudUhvdmVyUmVtb3ZlRXZlbnQoKTtcbiAgICAgIG1xTW9iaWxlSW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL+uNsOyKpO2BrO2DkSDroIjsnbTslYTsm4NcbiAgICAgIGlmIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNsaWNrTWVudUJveFtjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgICB9XG5cbiAgICAgIG1lbnVUaXRsZUFyci5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVudVRpdGxlRXZlbnRIYW5kbGVyW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICAgIG1lbnVUaXRsZUV2ZW50SGFuZGxlciA9IFtdO1xuICAgICAgbWVudVRpdGxlUW5hLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVudVRpdGxlUW5hRXZlbnQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZW51RXhjZXB0RXZlbnQpO1xuICAgICAgbWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG1lbnVFdmVudCk7XG4gICAgICBtcURlc2tUb3BJbml0KCk7XG4gICAgfVxuICB9XG59XG47XG5cbmZ1bmN0aW9uIG1lbnVIb3ZlckFkZEV2ZW50KCkge1xuICB2YXIgY3VycmVudCA9IG51bGw7XG4gIG1lbnVUaXRsZUFyci5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgbWVudUxpc3RBcnJbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgICAgfVxuXG4gICAgICBtZW51TGlzdEFycltpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgY3VycmVudCA9IGluZGV4O1xuICAgIH0pO1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtZW51TGlzdEFycltpbmRleF0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgIH0pO1xuICB9KTtcbiAgbWVudUxpc3RBcnIuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIG1lbnVMaXN0QXJyW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICAgIH1cblxuICAgICAgbWVudUxpc3RBcnJbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICAgIGN1cnJlbnQgPSBpbmRleDtcbiAgICB9KTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgbWVudUxpc3RBcnJbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1lbnVIb3ZlclJlbW92ZUV2ZW50KCkge1xuICBtZW51VGl0bGVBcnIuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lbnVMaXN0QXJyW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdub25lJyk7XG4gICAgfSk7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lbnVMaXN0QXJyW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgfSk7XG4gIH0pO1xuICBtZW51TGlzdEFyci5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgbWVudUxpc3RBcnJbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICB9KTtcbiAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgbWVudUxpc3RBcnJbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1xRGVza1RvcEluaXQoKSB7XG4gIGxvZ28uc2V0QXR0cmlidXRlKCdzcmMnLCAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFKWUFBQUF5QVFNQUFBQ0VRckJaQUFBQUExQk1WRVgvLy8rbnhCdklBQUFBQVhSU1RsTUFRT2JZWmdBQUFCRkpSRUZVZU5wallCZ0ZvMkFVREhjQUFBUG9BQUhPU1V4WUFBQUFBRWxGVGtTdVFtQ0MnKTtcbiAgbWVudS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gIG1lbnVUaXRsZVFuYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnL2JvYXJkL3FuYS9saXN0Lmh0bWwnKTtcbiAgbWVudUhvdmVyQWRkRXZlbnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lbnVJbmZvVG9nZ2xlKCkge1xuICB2YXIgZmxhZyA9IGZhbHNlO1xuICBtZW51SW5mb1RleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghZmxhZykge1xuICAgICAgbWVudUluZm8uY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZW51SW5mby5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgfVxuXG4gICAgZmxhZyA9ICFmbGFnO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZmxhZykge1xuICAgICAgLy90YXJnZXQg64uk66W4IOqzs1xuICAgICAgbWVudUluZm8uY2xhc3NMaXN0LmFkZChcIm5vbmVcIik7XG4gICAgICBmbGFnID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgbWVudUluZm8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/base/headerHover.ts\n");

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./src/base/headerHover.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/base/headerHover.ts */"./src/base/headerHover.ts");


/***/ })

/******/ });