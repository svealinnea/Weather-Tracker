import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("")
  $('.showHumidity').text("");
  $('.showTemp').text("")
  $('.showFeels').text("");
  $('.showPrecipitation').text("");
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(city);
    promise.then(function(response) {
      const body = JSON.parse(response)
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${parseInt((response.main.temp) - 273.15) * 9/5 + 32} °F.`);
      $('.showFeels').text(`The temperature feels like ${parseInt((response.main.feels_like) - 273.15) * 9/5 + 32} °F`);
      $('.showPrecipitation').text(`There is currently ${response.weather[0].description} outside`) 
    },
      function(error) {
        $('.showErrors').text('There was an error processing your request: ${error}');
      });
    });
  });