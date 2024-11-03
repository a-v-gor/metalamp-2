import updateRatingButton from "../rate-button/rate-button";
import $ from 'jquery';

updateRatingButton('rate-button');
updateRatingButton('rate-button-test');

$( document ).ready(function() {
 
  $( "body" ).click(function() {

      alert( "Thanks for visiting!" );

  });

});