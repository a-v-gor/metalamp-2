export default function rangeSlider() {
  let labelMin = document.getElementById('range-label-min');
  let labelMax = document.getElementById('range-label-max');
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

  const updateInput = (event)=> {
    const mouseCoordinateX = event.clientX;

    const makeElementUnactive = (element) => {
      if(element.classList.contains('range-slider__input_active')) {
        element.classList.remove('range-slider__input_active')
      }
      if(!element.classList.contains('range-slider__input_unactive')) {
        element.classList.add('range-slider__input_unactive')
      }
    }

    const makeElementActive = (element) => {
      if(element.classList.contains('range-slider__input_unactive')) {
        element.classList.remove('range-slider__input_unactive')
      }
      if(!element.classList.contains('range-slider__input_active')) {
        element.classList.add('range-slider__input_active')
      }
    }    

    if (Math.abs(mouseCoordinateX - returnCurrentMinValueCoordinateX()) < Math.abs(mouseCoordinateX - returnCurrentMaxValueCoordinateX())) {
      makeElementActive(returnInputMin());
      makeElementUnactive(returnInputMax());
    } else if (Math.abs(mouseCoordinateX - returnCurrentMinValueCoordinateX()) > Math.abs(mouseCoordinateX - returnCurrentMaxValueCoordinateX())) {
      makeElementUnactive(returnInputMin());
      makeElementActive(returnInputMax());
    }

    updateLabelsInfo();
    updateTrack();
  }

  const updateTrack = () => {
    const [trackFirst, trackActive, trackLast] = document.querySelectorAll('.range-slider__track');
    trackFirst.style.width = returnCurrentMinValueCoordinateX() - wrapperClientRect.x + 'px';
    trackActive.style.width = returnCurrentMaxValueCoordinateX() - returnCurrentMinValueCoordinateX() + 'px';
    trackLast.style.width = wrapperClientRect.x + wrapperClientRect.width - returnCurrentMaxValueCoordinateX() + 'px';
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

  updateLabelsInfo();
  updateTrack();
  inputWrapper.addEventListener('mousemove', updateInput);
  inputs[0].addEventListener('input', updateTrack);
  inputs[1].addEventListener('input', updateTrack);
}