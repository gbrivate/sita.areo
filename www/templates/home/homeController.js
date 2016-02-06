/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';

  angular
    .module('sitaApp')
    .controller('homeController', homeController);

  homeController.$inject = ['$scope', '$state', '$http', '$ionicScrollDelegate', '$ionicHistory'];

  function homeController($scope, $state, $http, $ionicScrollDelegate, $ionicHistory) {
    var vm = this;

    vm.goTo = function (url) {
      $state.go(url);
    }
  }
})();
