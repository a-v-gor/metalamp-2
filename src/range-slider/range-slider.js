export default function rangeSlider() {
  const labelMin = document.getElementById('range-label-min');
  const labelMax = document.getElementById('range-label-max');
  const inputMin = document.getElementById('range-min');
  const inputMax = document.getElementById('range-max');
  const inputWrapper = document.getElementById('range-input-wrapper');

  const hoistCurrentInput = (event)=> {
    const mouseCoordinateX = event.clientX;
    const wrapperCoordinateX = inputWrapper.getBoundingClientRect().x;
    const currentMinValueCoordinateX = Math.ceil((inputMin.value/15000)*266) + wrapperCoordinateX;
    const currentMaxValueCoordinateX = Math.ceil((inputMax.value/15000)*266) + wrapperCoordinateX;
    const middlePointCoordinateX = Math.round((currentMinValueCoordinateX + currentMaxValueCoordinateX)/2);

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

    if (mouseCoordinateX <= middlePointCoordinateX) {
      makeElementActive(inputMin)
      makeElementUnactive(inputMax)
      inputMin.max=inputMax.value;
      inputMin.style.width=inputMax.value/150+'%';
      
    } else {
      makeElementActive(inputMax)
      makeElementUnactive(inputMin)
      inputMax.min=inputMin.value;
      inputMin.style.width=inputMin.value/150+'%';
      inputMin.max=inputMin.value;
      inputMax.style.width=(15000-inputMin.value)/150+'%';
    }
  }

  inputMin.addEventListener('input', ()=> labelMin.textContent = inputMin.value+"₽");
  inputMax.addEventListener('input', ()=> labelMax.textContent = inputMax.value+"₽");
  inputWrapper.addEventListener('mousemove', hoistCurrentInput);
}