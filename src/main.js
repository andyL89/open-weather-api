import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showCurentTemp').text(`The temperature will be a high of ${response.main.temp_max} degrees and a low of ${response.main.temp_min} degrees, with the current being ${response.main.temp}.`);
      $('.showHiLoTemp').text(`High of ${Math.round(response.main.temp_max)} degrees and a low of ${Math.round(response.main.temp_min)} degrees.`);
      $('.showWind').text(`The wind is blowing at ${response.wind.speed} mph.`);
      $('.showClouds').text(`The sky today will be ${response.weather[0].description}.`);
    }
  });
});