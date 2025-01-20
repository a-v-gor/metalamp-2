import updateDropdown from "../dropdown/dropdown";
import rangeSlider from "../range-slider/range-slider";

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => updateDropdown(dropdown.id));
rangeSlider();