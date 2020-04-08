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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mqInit\", function() { return mqInit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"menuInfoToggle\", function() { return menuInfoToggle; });\nvar menuTitleArr = Array.from(document.querySelectorAll('.mid-nav-menu >li > a'));\nvar menuListBox = document.querySelector('.hover-menu-container');\nvar mqMobile = window.matchMedia(\"(max-width: 767px)\");\nvar clickMenuBox = document.querySelectorAll('.click-menu-box'); //사이드 메뉴 배열\n\nvar menu = document.querySelector('.click-menu-container');\nvar menuInfoText = document.querySelector('.mid-nav-info-text');\nvar menuInfo = document.querySelector('.mid-nav-info');\nvar menuTitleQna = document.querySelector('#qna-anchor');\nvar logo = document.querySelector('#logo');\nfunction mqInit() {\n  var menuTitleEventHandler = [];\n  var menuTitleQnaEvent;\n  var menuExceptEvent;\n  var menuEvent;\n  var current = null;\n\n  if (mqMobile.matches) {\n    //모바일 레이아웃\n    mqMobileInit();\n  } else {\n    //데스크탑 레이아웃\n    mqDeskTopInit();\n  }\n\n  mqMobile.addListener(mqFunc);\n\n  function mqMobileInit() {\n    logo.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyAQMAAACEQrBZAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABFJREFUeNpjYBgFo2AUDHcAAAPoAAHOSUxYAAAAAElFTkSuQmCC');\n    menu.classList.remove('none');\n    menuTitleQna.setAttribute('href', '#');\n    var isMenuClick = false;\n    menuTitleArr.forEach(function (node, index) {\n      var event = function event(e) {\n        if (current !== null) {\n          clickMenuBox[current].classList.add('none');\n        }\n\n        switch (index) {\n          case 0:\n            document.querySelector('.click-menu-introduce').classList.remove('none');\n            current = 0;\n            break;\n\n          case 1:\n            document.querySelector('.click-menu-system').classList.remove('none');\n            current = 1;\n            break;\n\n          case 2:\n            document.querySelector('.click-menu-statistics').classList.remove('none');\n            current = 2;\n            break;\n\n          case 3:\n            document.querySelector('.click-menu-community').classList.remove('none');\n            current = 3;\n            break;\n        }\n\n        menu.style.borderBottom = \"1px solid #09538e\";\n        e.stopPropagation();\n      };\n\n      menuTitleEventHandler.push(event);\n      node.addEventListener('click', event);\n    });\n\n    menuTitleQnaEvent = function menuTitleQnaEvent(e) {\n      if (current !== null) {\n        clickMenuBox[current].classList.add('none');\n      }\n\n      document.querySelector('.click-menu-qna').classList.remove('none');\n      current = 4;\n      e.stopPropagation();\n    };\n\n    menuTitleQna.addEventListener('click', menuTitleQnaEvent);\n\n    menuExceptEvent = function menuExceptEvent() {\n      if (!isMenuClick) {\n        //target 다른 곳\n        if (current !== null) {\n          clickMenuBox[current].classList.add('none');\n          menu.style.borderBottom = \"none\";\n        }\n      }\n\n      isMenuClick = false;\n    };\n\n    document.addEventListener('click', menuExceptEvent);\n\n    menuEvent = function menuEvent() {\n      //target\n      isMenuClick = true;\n    };\n\n    menu.addEventListener('click', menuEvent);\n  }\n\n  function mqFunc(mediaQuery) {\n    if (mediaQuery.matches) {\n      //모바일 레이아웃\n      menuHoverRemoveEvent();\n      mqMobileInit();\n    } else {\n      //데스크탑 레이아웃\n      if (current !== null) {\n        clickMenuBox[current].classList.add('none');\n      }\n\n      menuTitleArr.forEach(function (node, index) {\n        node.removeEventListener('click', menuTitleEventHandler[index]);\n      });\n      menuTitleEventHandler = [];\n      menuTitleQna.removeEventListener('click', menuTitleQnaEvent);\n      document.removeEventListener('click', menuExceptEvent);\n      menu.removeEventListener('click', menuEvent);\n      mqDeskTopInit();\n    }\n  }\n}\n;\n\nfunction menuListShow() {\n  menuListBox.classList.remove('none');\n}\n\nfunction menuListHide() {\n  menuListBox.classList.add('none');\n}\n\nfunction menuHoverAddEvent() {\n  menuTitleArr.forEach(function (node) {\n    node.addEventListener('mouseover', menuListShow);\n    node.addEventListener('mouseout', menuListHide);\n  });\n  menuListBox.addEventListener('mouseover', menuListShow);\n  menuListBox.addEventListener('mouseout', menuListHide);\n}\n\nfunction menuHoverRemoveEvent() {\n  menuTitleArr.forEach(function (node) {\n    node.removeEventListener('mouseover', menuListShow);\n    node.removeEventListener('mouseout', menuListHide);\n  });\n  menuListBox.removeEventListener('mouseover', menuListShow);\n  menuListBox.removeEventListener('mouseout', menuListHide);\n}\n\nfunction mqDeskTopInit() {\n  logo.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyAQMAAACEQrBZAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABFJREFUeNpjYBgFo2AUDHcAAAPoAAHOSUxYAAAAAElFTkSuQmCC');\n  menu.classList.add('none');\n  menuTitleQna.setAttribute('href', '/board/qna/list.html');\n  menuHoverAddEvent();\n}\n\nfunction menuInfoToggle() {\n  var flag = false;\n  menuInfoText.addEventListener('click', function (e) {\n    if (!flag) {\n      menuInfo.classList.remove('none');\n    } else {\n      menuInfo.classList.add('none');\n    }\n\n    flag = !flag;\n    e.stopPropagation();\n  });\n  document.addEventListener('click', function () {\n    if (flag) {\n      //target 다른 곳\n      menuInfo.classList.add(\"none\");\n      flag = false;\n    }\n  });\n  menuInfo.addEventListener(\"click\", function (e) {\n    e.stopPropagation();\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFzZS9oZWFkZXJIb3Zlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYXNlL2hlYWRlckhvdmVyLnRzP2E4YTQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1lbnVUaXRsZUFyciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pZC1uYXYtbWVudSA+bGkgPiBhJykpO1xudmFyIG1lbnVMaXN0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdmVyLW1lbnUtY29udGFpbmVyJyk7XG52YXIgbXFNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2N3B4KVwiKTtcbnZhciBjbGlja01lbnVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xpY2stbWVudS1ib3gnKTsgLy/sgqzsnbTrk5wg66mU64m0IOuwsOyXtFxuXG52YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1tZW51LWNvbnRhaW5lcicpO1xudmFyIG1lbnVJbmZvVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWQtbmF2LWluZm8tdGV4dCcpO1xudmFyIG1lbnVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZC1uYXYtaW5mbycpO1xudmFyIG1lbnVUaXRsZVFuYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNxbmEtYW5jaG9yJyk7XG52YXIgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dvJyk7XG5leHBvcnQgZnVuY3Rpb24gbXFJbml0KCkge1xuICB2YXIgbWVudVRpdGxlRXZlbnRIYW5kbGVyID0gW107XG4gIHZhciBtZW51VGl0bGVRbmFFdmVudDtcbiAgdmFyIG1lbnVFeGNlcHRFdmVudDtcbiAgdmFyIG1lbnVFdmVudDtcbiAgdmFyIGN1cnJlbnQgPSBudWxsO1xuXG4gIGlmIChtcU1vYmlsZS5tYXRjaGVzKSB7XG4gICAgLy/rqqjrsJTsnbwg66CI7J207JWE7JuDXG4gICAgbXFNb2JpbGVJbml0KCk7XG4gIH0gZWxzZSB7XG4gICAgLy/rjbDsiqTtgaztg5Eg66CI7J207JWE7JuDXG4gICAgbXFEZXNrVG9wSW5pdCgpO1xuICB9XG5cbiAgbXFNb2JpbGUuYWRkTGlzdGVuZXIobXFGdW5jKTtcblxuICBmdW5jdGlvbiBtcU1vYmlsZUluaXQoKSB7XG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ3NyYycsICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUpZQUFBQXlBUU1BQUFDRVFyQlpBQUFBQTFCTVZFWC8vLytueEJ2SUFBQUFBWFJTVGxNQVFPYllaZ0FBQUJGSlJFRlVlTnBqWUJnRm8yQVVESGNBQUFQb0FBSE9TVXhZQUFBQUFFbEZUa1N1UW1DQycpO1xuICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgIG1lbnVUaXRsZVFuYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgIHZhciBpc01lbnVDbGljayA9IGZhbHNlO1xuICAgIG1lbnVUaXRsZUFyci5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgdmFyIGV2ZW50ID0gZnVuY3Rpb24gZXZlbnQoZSkge1xuICAgICAgICBpZiAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsaWNrTWVudUJveFtjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsaWNrLW1lbnUtaW50cm9kdWNlJykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1tZW51LXN5c3RlbScpLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xpY2stbWVudS1zdGF0aXN0aWNzJykuY2xhc3NMaXN0LnJlbW92ZSgnbm9uZScpO1xuICAgICAgICAgICAgY3VycmVudCA9IDI7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1tZW51LWNvbW11bml0eScpLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSAzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBtZW51LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkICMwOTUzOGVcIjtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH07XG5cbiAgICAgIG1lbnVUaXRsZUV2ZW50SGFuZGxlci5wdXNoKGV2ZW50KTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCk7XG4gICAgfSk7XG5cbiAgICBtZW51VGl0bGVRbmFFdmVudCA9IGZ1bmN0aW9uIG1lbnVUaXRsZVFuYUV2ZW50KGUpIHtcbiAgICAgIGlmIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNsaWNrTWVudUJveFtjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGljay1tZW51LXFuYScpLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICAgIGN1cnJlbnQgPSA0O1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgbWVudVRpdGxlUW5hLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVudVRpdGxlUW5hRXZlbnQpO1xuXG4gICAgbWVudUV4Y2VwdEV2ZW50ID0gZnVuY3Rpb24gbWVudUV4Y2VwdEV2ZW50KCkge1xuICAgICAgaWYgKCFpc01lbnVDbGljaykge1xuICAgICAgICAvL3RhcmdldCDri6Trpbgg6rOzXG4gICAgICAgIGlmIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xpY2tNZW51Qm94W2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ25vbmUnKTtcbiAgICAgICAgICBtZW51LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlzTWVudUNsaWNrID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVudUV4Y2VwdEV2ZW50KTtcblxuICAgIG1lbnVFdmVudCA9IGZ1bmN0aW9uIG1lbnVFdmVudCgpIHtcbiAgICAgIC8vdGFyZ2V0XG4gICAgICBpc01lbnVDbGljayA9IHRydWU7XG4gICAgfTtcblxuICAgIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZW51RXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbXFGdW5jKG1lZGlhUXVlcnkpIHtcbiAgICBpZiAobWVkaWFRdWVyeS5tYXRjaGVzKSB7XG4gICAgICAvL+uqqOuwlOydvCDroIjsnbTslYTsm4NcbiAgICAgIG1lbnVIb3ZlclJlbW92ZUV2ZW50KCk7XG4gICAgICBtcU1vYmlsZUluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy/rjbDsiqTtgaztg5Eg66CI7J207JWE7JuDXG4gICAgICBpZiAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICBjbGlja01lbnVCb3hbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgICAgfVxuXG4gICAgICBtZW51VGl0bGVBcnIuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG1lbnVUaXRsZUV2ZW50SGFuZGxlcltpbmRleF0pO1xuICAgICAgfSk7XG4gICAgICBtZW51VGl0bGVFdmVudEhhbmRsZXIgPSBbXTtcbiAgICAgIG1lbnVUaXRsZVFuYS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG1lbnVUaXRsZVFuYUV2ZW50KTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWVudUV4Y2VwdEV2ZW50KTtcbiAgICAgIG1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtZW51RXZlbnQpO1xuICAgICAgbXFEZXNrVG9wSW5pdCgpO1xuICAgIH1cbiAgfVxufVxuO1xuXG5mdW5jdGlvbiBtZW51TGlzdFNob3coKSB7XG4gIG1lbnVMaXN0Qm94LmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbn1cblxuZnVuY3Rpb24gbWVudUxpc3RIaWRlKCkge1xuICBtZW51TGlzdEJveC5jbGFzc0xpc3QuYWRkKCdub25lJyk7XG59XG5cbmZ1bmN0aW9uIG1lbnVIb3ZlckFkZEV2ZW50KCkge1xuICBtZW51VGl0bGVBcnIuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgbWVudUxpc3RTaG93KTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgbWVudUxpc3RIaWRlKTtcbiAgfSk7XG4gIG1lbnVMaXN0Qm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIG1lbnVMaXN0U2hvdyk7XG4gIG1lbnVMaXN0Qm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgbWVudUxpc3RIaWRlKTtcbn1cblxuZnVuY3Rpb24gbWVudUhvdmVyUmVtb3ZlRXZlbnQoKSB7XG4gIG1lbnVUaXRsZUFyci5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBtZW51TGlzdFNob3cpO1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBtZW51TGlzdEhpZGUpO1xuICB9KTtcbiAgbWVudUxpc3RCb3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgbWVudUxpc3RTaG93KTtcbiAgbWVudUxpc3RCb3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBtZW51TGlzdEhpZGUpO1xufVxuXG5mdW5jdGlvbiBtcURlc2tUb3BJbml0KCkge1xuICBsb2dvLnNldEF0dHJpYnV0ZSgnc3JjJywgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSllBQUFBeUFRTUFBQUNFUXJCWkFBQUFBMUJNVkVYLy8vK254QnZJQUFBQUFYUlNUbE1BUU9iWVpnQUFBQkZKUkVGVWVOcGpZQmdGbzJBVURIY0FBQVBvQUFIT1NVeFlBQUFBQUVsRlRrU3VRbUNDJyk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICBtZW51VGl0bGVRbmEuc2V0QXR0cmlidXRlKCdocmVmJywgJy9ib2FyZC9xbmEvbGlzdC5odG1sJyk7XG4gIG1lbnVIb3ZlckFkZEV2ZW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZW51SW5mb1RvZ2dsZSgpIHtcbiAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgbWVudUluZm9UZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIWZsYWcpIHtcbiAgICAgIG1lbnVJbmZvLmNsYXNzTGlzdC5yZW1vdmUoJ25vbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVudUluZm8uY2xhc3NMaXN0LmFkZCgnbm9uZScpO1xuICAgIH1cblxuICAgIGZsYWcgPSAhZmxhZztcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGZsYWcpIHtcbiAgICAgIC8vdGFyZ2V0IOuLpOuluCDqs7NcbiAgICAgIG1lbnVJbmZvLmNsYXNzTGlzdC5hZGQoXCJub25lXCIpO1xuICAgICAgZmxhZyA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIG1lbnVJbmZvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/base/headerHover.ts\n");

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