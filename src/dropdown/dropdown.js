export default function updateDropdown(id) {
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
