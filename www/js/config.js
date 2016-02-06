/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';

  angular.module('sitaApp')
    .constant('CONFIG', {
      appName: 'SITA - AIPORT API',
      version: '1.0',
      //apiURL: '/api/',
      apiURL: 'https://airport.api.aero/',
      apiKey: '17e097059d4f9689a8d68e7e60a6676e'
    })

    /*
     * MESSAGES constant.
     * Contain all Front-end messages.
     */
    .constant('MESSAGES', {
      searchAirport: '<p>Searching airports</p><ion-spinner icon="lines"></ion-spinner><p>wait</p>',
      searchCities: '<p>Searching cities</p><ion-spinner icon="lines"></ion-spinner><p>wait</p>'
    });
})();
