/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';

  angular
    .module('sitaApp')
    .controller('airportController', airportController)
    .filter('search', search);


  airportController.$inject = ['$scope', '$state', '$http', '$ionicScrollDelegate', '$ionicHistory',
    'airportService', '$filter', 'MESSAGES', 'loading', 'airPortList', '$cordovaGeolocation', 'showAlert'];

  function airportController($scope, $state, $http, $ionicScrollDelegate,
                             $ionicHistory, airportService, $filter, MESSAGES, loading, airPortList,
                             $cordovaGeolocation, showAlert) {
    var vm = this;
    vm.countries = airPortList.countries;
    vm.title = airPortList.title;
    vm.request = {};

    vm.retrieveAirPorts = function () {
      loading.show(MESSAGES.searchAirport);
      if (airPortList.countries && airPortList.countries.length != 0) {
        airPortList.title = 'COUNTRIES';
        vm.countries = airPortList.countries;
        vm.goTo('country');
        loading.hide();
        return;
      }

      airportService.loadAllAirports().$promise.then(function (response) {
        airPortList.isLocation = false;
        var list = response.airports;
        list = $filter('orderBy')(list, ['country', 'city'], false);
        vm.countries = [];
        var country = [];
        country.name = list[0].country;
        country.cities = [];
        for (var i = 0; i < list.length; i++) {
          var city = list[i];
          if (city.country && city.country != "") {
            if (country.name == city.country) {
              country.cities.push(city);
            } else {
              vm.countries.push(country);
              country = [];
              country.name = city.country;
              country.cities = [];
              country.cities.push(city);
            }
          }
        }
        airPortList.countries = vm.countries;
        loading.hide();
        airPortList.title = 'COUNTRIES';
        vm.goTo('country');
      }, function (error) {
        console.log(error);

      });
    }


    vm.loadCities = function (country) {
      loading.show(MESSAGES.searchCities);
      vm.cities = [];
      airPortList.cities = country.cities;
      airPortList.title = country.name
      vm.goTo('city');
      ;
    }

    vm.goTo = function (url) {
      $state.go(url);
    }

    if (!vm.countries || vm.countries.length == 0) {
      loading.hide();
      vm.goTo('airport');
    }


    vm.getLocation = function(){
      var options = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        vm.request.lat = position.coords.latitude;
        vm.request.lng = position.coords.longitude;
        vm.request.max = 10;
        vm.findAiportByLocationloadAllAirports();
      }, function () {
        loading.hide();
        handleLocationError(true, infoWindow, map.getCenter());
        showAlert.attention(null, 'Get current location is not working, try later.');
      });

    }


    vm.findAiportByLocationloadAllAirports = function () {
      loading.show(MESSAGES.searchAirport);
      console.log(vm.request);
      airportService.findAirpots(vm.request).$promise.then(function (response) {
        airPortList.isLocation = true;
        airPortList.cities = response.airports;
        loading.hide();
        airPortList.title = 'CITIES';
        vm.goTo('city');
      }, function (error) {
        console.log(error);

      });
    }

  }

  function search($filter) {
    return function (items, query) {
      var filtered = [];
      for (var i = 0; i < items.length; i++) {
        var country = items[i];
        country.name = $filter('uppercase')(country.name);
        query = $filter('uppercase')(query);
        if (country.name.indexOf(query) > -1) {
          filtered.push(country);
        }
      }
      if (filtered.length == 0)
        return items;
      else
        return filtered;
    };
  }
})();
