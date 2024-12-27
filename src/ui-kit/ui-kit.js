import updateDropdown from "../dropdown/dropdown";
import rangeSlider from "../range-slider/range-slider";
import updateRatingButton from "../rate-button/rate-button";

const dropdowns = document.querySelectorAll('.dropdown');
const ratingButtons = document.querySelectorAll('.rate-button__form');
dropdowns.forEach((dropdown) => updateDropdown(dropdown.id));
ratingButtons.forEach((ratingButton) => updateRatingButton(ratingButton.id));
rangeSlider();
