/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';
  angular.module('sitaApp')
    .factory('airportService', airportService);

  airportService.$inject = ['$resource', 'CONFIG'];

  function airportService($resource, CONFIG) {
    var airportService = {
      loadAllAirports: loadAllAirports,
      findAirpots: findAirpots
    };

    return airportService;

    function loadAllAirports() {
      var loadAllAirports = $resource(CONFIG.apiURL + 'airport?user_key=' + CONFIG.apiKey + '&callback=JSON_CALLBACK',
        null,
        {
          'get': {
            method: "JSONP"
          }
        });
      return loadAllAirports.get();
    }

    function findAirpots(request) {
      var findAirports = $resource(
        CONFIG.apiURL + 'airport/nearest/' + request.lat + '/' + request.lng +
        '?maxAirports=' + request.max + '&user_key=' + CONFIG.apiKey + '&callback=JSON_CALLBACK',
        null,
        {
          'get': {
            method: "JSONP"
          }
        });
      return findAirports.get();
    }

  }
})();
