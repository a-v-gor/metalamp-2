export default function rangeSlider() {
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