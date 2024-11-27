import updateDropdown from "../dropdown/dropdown";
import rangeSlider from "../range-slider/range-slider";
import updateRatingButton from "../rate-button/rate-button";


const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => updateDropdown(dropdown.id))
updateRatingButton('rate-button');
updateRatingButton('rate-button-test');
rangeSlider();