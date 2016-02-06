/* SITA API - APP BY GABRIEL SANTOS */

(function () {
  'use strict';
  angular.module('sitaApp', [
      'ionic',
      'ngResource',
      'ngTouch',
      'ngCordova'
    ])

    .run(run, run)
    .config(config, config);

  run.$inject = ['$ionicPlatform'];
  config.$inject = ['$ionicConfigProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function run($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

  function config($ionicConfigProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    // ionic config (cordova).
    //ionic.Platform.showStatusBar(true);

    // get the platform.
    var currentPlatform = ionic.Platform.platform();

    // get platform version.
    var currentPlatformVersion = ionic.Platform.version();

    // set iOS platform default if the curremt is not like Android or iOS.
    var setPlatForm = (currentPlatform != 'android' && currentPlatform != 'ios') ? 'ios' : currentPlatform;

    // set the platform that will run the view transitions.
   // $ionicConfigProvider.views.transition(setPlatForm);

    console.log('Platform: ' + currentPlatform);
    console.log('Version: ' + currentPlatformVersion);
    console.log('set platform: ' + setPlatForm);

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
      })
      .state('airport', {
        url: '/airport',
        templateUrl: 'templates/airport/airport.html',
        controller: 'airportController',
        controllerAs: 'airportCtrl'
      })
      .state('country', {
        url: '/country',
        templateUrl: 'templates/airport/country.html',
        controller: 'airportController',
        controllerAs: 'airportCtrl'
      })
      .state('city', {
        url: '/city',
        templateUrl: 'templates/city/city.html',
        controller: 'cityController',
        controllerAs: 'cityCtrl'
      })
      .state('location', {
        url: '/location',
        templateUrl: 'templates/city/location.html',
        controller: 'cityController',
        controllerAs: 'cityCtrl'
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('airport');
  }

})();
