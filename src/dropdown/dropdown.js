export default function updateDropdown() {
  const dropdown = document.getElementById('dropdown-convenience-exp');
  const optionsArr = dropdown.querySelectorAll('.dropdown__option');
  const label = dropdown.querySelector('label');
  const optionsLabels = [
    ['спальня', 'кровать', 'ванная комната'],
    ['спальни', 'кровати', 'ванные комнаты'],
    ['спален', 'кроватей', 'ванных комнат']
  ]
  const optionsNums = [0, 0, 0];

  const updateLabel = () => {
    const resultStringArr = [];
    optionsNums.forEach((item, index) => {
      if (item > 0) {
        let labelsIndex = 0;
        if (item > 1 && item < 5) {
          labelsIndex = 1;
        } else if (item > 4) {
          labelsIndex = 2;
        }
        resultStringArr.push(`${item} ${optionsLabels[labelsIndex][index]}`);
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

  optionsArr.forEach((element, index) => {
    const [decreaseButton, increaseButton] = element.querySelectorAll('button');
    const input = element.querySelector('input');

    const unactiveButton = (button) => {
      button.disabled = true;
      button.classList.add('dropdown__set-option-num_unactive');
    }

    const activeButton = (button) => {
      button.disabled = false;
      button.classList.remove('dropdown__set-option-num_unactive');
    }

    const updateButtons = () => {
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
      if (event.target === decreaseButton) {
        input.value = Number(input.value) - 1
      } else {
        input.value = Number(input.value) + 1
      }
      updateButtons();
      updateOptionsNums(index, input.value);
      updateLabel();
    }

    updateButtons();
    increaseButton.addEventListener('click', updateOption);
    decreaseButton.addEventListener('click', updateOption);
  })
}
