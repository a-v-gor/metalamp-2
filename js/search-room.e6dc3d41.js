/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dropdown/dropdown.js":
/*!**********************************!*\
  !*** ./src/dropdown/dropdown.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateDropdown)
/* harmony export */ });
function updateDropdown(id) {
  const dropdown = document.getElementById(id);
  const optionsArr = dropdown.querySelectorAll('.dropdown__option');
  const label = dropdown.querySelector('label');
  const clearButton = dropdown.querySelectorAll('.button-link')[1] || null;
  const type = dropdown.classList.contains('dropdown__guests') ? 'guests' : 'convenience';
  const optionsNums = dropdown.id === 'dropdown-guests-exp-1'||dropdown.id === 'card-room-cost-dropdown' ? [2, 1, 0] :
    dropdown.id === 'dropdown-convenience' || dropdown.id === 'dropdown-convenience-exp' ? [2, 2, 0] :
    dropdown.id === 'search-room-dropdown-guests' ? [2, 1, 1] : [0, 0, 0];

  const returnOptionString = (optionNum, labelsArr) => {
    let labelsIndex = 0;
    if (optionNum > 1 && optionNum < 5) {
      labelsIndex = 1;
    } else if (optionNum > 4) {
      labelsIndex = 2;
    }
    return `${optionNum} ${labelsArr[labelsIndex]}`;
  }

  const updateGuestsLabel = () => {
    const resultStringArr = [];
    const guestsNum = optionsNums[0] + optionsNums[1];
    const babyNum = optionsNums[2];
    if (guestsNum > 0) {
      const guestsStr = returnOptionString(guestsNum, ['гость', 'гостя', 'гостей']);
      resultStringArr.push(guestsStr);
    }
    if (babyNum > 0) {
      const babiesStr = returnOptionString(babyNum, ['младенец', 'младенца', 'младенцев']);
      resultStringArr.push(babiesStr);
    }
    if (!resultStringArr.length) {
      resultStringArr.push('Сколько гостей');
    }
    label.textContent = resultStringArr.join(', ');
  }

  const updateLabel = () => {
    const optionsLabels = [
      ['спальня', 'спальни', 'спален'],
      ['кровать', 'кровати', 'кроватей'],
      ['ванная комната', 'ванные комнаты', 'ванных комнат']
    ];
    const resultStringArr = [];
    optionsNums.forEach((item, index) => {
      if (item > 0) {
        const itemStr = returnOptionString(item, optionsLabels[index]);
        resultStringArr.push(itemStr);
      }
    })
    if (!resultStringArr.length) {
      resultStringArr.push('Удобства');
    }
    if (resultStringArr.length > 1) {
      resultStringArr.length = 2;
      label.textContent = resultStringArr.join(', ') + '...';
    } else {
      label.textContent = resultStringArr[0];
    }
  }
  
  const updateOptionsNums = (num, value) => {
    optionsNums[num] = +value;
  }

  const unactiveButton = (button) => {
    button.disabled = true;
    if (!button.classList.contains('dropdown__set-option-num_unactive')) {
      button.classList.add('dropdown__set-option-num_unactive');
    }
  }

  const activeButton = (button) => {
    button.disabled = false;
    if (button.classList.contains('dropdown__set-option-num_unactive')) {
      button.classList.remove('dropdown__set-option-num_unactive');
    }
  }

  const checkClearButtonActive = () => {
    if (clearButton !== null) {
      if (Math.max(...optionsNums) > 0) {
        clearButton.classList.remove('dropdown__unactive-button');
        clearButton.disabled = false;
      } else {
        clearButton.classList.add('dropdown__unactive-button');
        clearButton.disabled = true;
      }
    }
  }

  optionsArr.forEach((element, index) => {
    const [decreaseButton, increaseButton] = element.querySelectorAll('button');
    const input = element.querySelector('input');

    const updateOptionsButtons = () => {
      if (input.value == 0) {
        unactiveButton(decreaseButton);
      } else {
        activeButton(decreaseButton);
      }
      if (input.value == 9) {
        unactiveButton(increaseButton);
      } else {
        activeButton(increaseButton);
      }
    }

    const updateOption = (event) => {
      event.preventDefault();
      if (event.target === decreaseButton) {
        input.value = Number(input.value) - 1
      } else {
        input.value = Number(input.value) + 1
      }
      updateOptionsButtons();
      updateOptionsNums(index, input.value);
      if (type === 'guests') {
        updateGuestsLabel();
      } else {
        updateLabel();
      }
      checkClearButtonActive();
    }

    updateOptionsButtons();
    increaseButton.addEventListener('click', updateOption);
    decreaseButton.addEventListener('click', updateOption);
  })

  const clearForm = () => {
    const inputs = dropdown.querySelectorAll('input[type=number]');

    inputs.forEach((input) => input.value = 0);    
    for(let i=0; i < 3; i += 1) {
      updateOptionsNums(i, 0);
    };

    const decreaseButtons = dropdown.querySelectorAll('.dropdown__decrease-option-num');
    const increaseButtons = dropdown.querySelectorAll('.dropdown__increase-option-num');

    for (let i = 0; i < decreaseButtons.length; i += 1) {
      unactiveButton(decreaseButtons[i]);
      activeButton(increaseButtons[i]);
    }
    checkClearButtonActive();
    if (type === 'guests') {
      updateGuestsLabel();
    } else {
      updateLabel();
    }
  }
  
  if(clearButton !== null) {
    clearButton.addEventListener('click', clearForm);
  }
  
  checkClearButtonActive();
  if (type === 'guests') {
    updateGuestsLabel();
  } else {
    updateLabel();
  }
}


/***/ }),

/***/ "./src/range-slider/range-slider.js":
/*!******************************************!*\
  !*** ./src/range-slider/range-slider.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rangeSlider)
/* harmony export */ });
function rangeSlider() {
  const labels = document.querySelectorAll('.range-slider__label');
  let labelMin = labels[0];
  let labelMax = labels[1];
  const inputs = document.querySelectorAll('.range-slider__input');
  const inputWrapper = document.getElementById('range-input-wrapper');
  const wrapperClientRect = inputWrapper.getBoundingClientRect();  
  
  const returnInputMin = () => {
    if(+inputs[0].value < +inputs[1].value) {
      return inputs[0];
    }
    return inputs[1];
  }
  
  const returnInputMax = () => {
    if(+inputs[0].value < +inputs[1].value) {
      return inputs[1];
    }
    return inputs[0];
  }

  const returnCurrentMinValueCoordinateX = () => {
    return Math.ceil((returnInputMin().value/15000)*wrapperClientRect.width) + wrapperClientRect.x;
  }

  const returnCurrentMaxValueCoordinateX = () => {
    return Math.ceil((returnInputMax().value/15000)*wrapperClientRect.width) + wrapperClientRect.x;
  }

  const updateLabelsInfo = () => {
    const formatStr = (num) => {
      const numStr = String(num);
      let result;
      if(num > 999) {
        result = numStr.slice(0, -3) + ' ' + numStr.slice(-3);
      } else {
        result = numStr;
      }
      return result + "₽";
    }
    labelMin.textContent = formatStr(returnInputMin().value);
    labelMax.textContent = formatStr(returnInputMax().value);
  }

  const updateInputs = (event)=> {
    if (Math.abs(event.target.value - returnInputMin().value) > Math.abs(event.target.value - returnInputMax().value)) {
      returnInputMax().value = event.target.value
    } else {
      returnInputMin().value = event.target.value
    }

    updateLabelsInfo();
    updateTracksViews();
  }

  const updateTracksViews = () => {
    const [trackFirst, trackActive, trackLast] = document.querySelectorAll('.range-slider__track');
    trackFirst.style.width = returnCurrentMinValueCoordinateX() - wrapperClientRect.x + 'px';
    trackActive.style.width = returnCurrentMaxValueCoordinateX() - returnCurrentMinValueCoordinateX() + 'px';
    trackLast.style.width = wrapperClientRect.x + wrapperClientRect.width - returnCurrentMaxValueCoordinateX() + 'px';
  }

  updateLabelsInfo();
  inputs[2].addEventListener('input', updateInputs);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/search-room/search-room.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropdown_dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dropdown/dropdown */ "./src/dropdown/dropdown.js");
/* harmony import */ var _range_slider_range_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../range-slider/range-slider */ "./src/range-slider/range-slider.js");



const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => (0,_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_0__["default"])(dropdown.id));
(0,_range_slider_range_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=search-room.e6dc3d41.js.map