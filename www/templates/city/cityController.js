/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';

  angular
    .module('sitaApp')
    .controller('cityController', cityController)
    .filter('searchCity', searchCity);

  cityController.$inject = ['$scope', '$state', '$http', '$ionicScrollDelegate', '$ionicHistory',
    'airportService', '$filter', 'MESSAGES', 'loading', 'airPortList', '$cordovaGeolocation'];

  function cityController($scope, $state, $http, $ionicScrollDelegate,
                          $ionicHistory, airportService, $filter, MESSAGES, loading, airPortList, $cordovaGeolocation) {
    var vm = this;
    vm.cities = airPortList.cities;
    vm.title = airPortList.title;
    vm.city = airPortList.city;
    vm.isLocation = airPortList.isLocation;

    vm.goTo = function (url) {
      $state.go(url);
    }

    $scope.$watch('$viewContentLoaded', function () {
      loading.hide();
    });

    vm.findLocation = function (city) {
      airPortList.city = city;
      vm.goTo('location');
    }

    if (!vm.cities || vm.cities.length == 0) {
      loading.hide();
      vm.goTo('airport');
    }

    vm.getMap = function () {
      vm.city = airPortList.city;
      vm.title = vm.city.city;
      var options = {timeout: 10000, enableHighAccuracy: true};
      var latLng = new google.maps.LatLng(vm.city.lat, vm.city.lng);
      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    var div = document.getElementById("map");
    if (div != null && div != undefined) {
      vm.getMap();
    }

  }

  function searchCity($filter) {
    return function (items, query) {
      var filtered = [];
      for (var i = 0; i < items.length; i++) {
        var city = items[i];
        city.city = $filter('uppercase')(city.city);
        query = $filter('uppercase')(query);
        if (city.city.indexOf(query) > -1) {
          filtered.push(city);
        }
      }
      if (filtered.length == 0)
        return items;
      else
        return filtered;
    };
  }

})();
