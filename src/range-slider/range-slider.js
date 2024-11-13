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
      makeElementActive(inputMin);
      makeElementUnactive(inputMax);
      inputMin.max=inputMax.value-100;
      inputMax.min=inputMax.value;
      inputMin.style.width=((inputMin.max)/150)*266-14+'px';
      inputMax.style.width=266-(((inputMin.max)/150)*266-14)+'px';
    // } else {
    //   makeElementUnactive(inputMin);
    //   makeElementActive(inputMax);
    //   inputMax.min=inputMin.value+100;
    //   inputMin.max=inputMin.value;
    //   inputMin.style.width=
    //   inputMax.style.width=(15000-inputMin.value+14)/150+'%';
    }
  }

  inputMin.addEventListener('input', ()=> labelMin.textContent = inputMin.value+"₽");
  inputMax.addEventListener('input', ()=> labelMax.textContent = inputMax.value+"₽");
  inputWrapper.addEventListener('mousemove', hoistCurrentInput);
}