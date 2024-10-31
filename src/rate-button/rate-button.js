export default function updateRatingButton() {
  const rateButtonForm = document.getElementById('rate-button');

  const formLabels = rateButtonForm.querySelectorAll('.rate-button__label');

  const removeActiveLabels = () => {
    formLabels.forEach((element) => {
      if(element.classList.contains('rate-button__label_active')) {
        element.classList.remove('rate-button__label_active')
      }
    });
  };

  const actualizeActiveLabels = (event) => {
    if (event.target.className === "rate-button__input") {
      removeActiveLabels();
      const num = +event.target.id.slice(-1);
      for (let i = 0; i < num; i += 1) {
        formLabels[i].classList.add('rate-button__label_active');
      }
    }
  }

  rateButtonForm.addEventListener('click', actualizeActiveLabels);
}