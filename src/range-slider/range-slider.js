export default function rangeSlider() {
  const labelMin = document.getElementById('range-label-min');
  const labelMax = document.getElementById('range-label-max');
  const inputMin = document.getElementById('range-min');
  const inputMax = document.getElementById('range-max');

  inputMin.addEventListener('input', ()=> labelMin.textContent = inputMin.value+"₽");
  inputMax.addEventListener('input', ()=> labelMax.textContent = inputMax.value+"₽");
}