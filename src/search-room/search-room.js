import updateDropdown from "../dropdown/dropdown";

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => updateDropdown(dropdown.id));