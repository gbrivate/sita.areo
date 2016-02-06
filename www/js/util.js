/* SITA API - APP BY GABRIEL SANTOS */

(function () {
    'use strict';

    angular.module('sitaApp')
      .factory('showAlert', showAlert)
      .factory('loading', loading)
      .service('airPortList', airPortList)
      .directive('ionSelect', ionSelect);

    showAlert.$inject = ['$ionicPopup'];
    loading.$inject = ['$ionicLoading'];
   //ionSelect.$inject = ['$scope'];

    function ionSelect() {
      var ionSelect = this;

      ionSelect = {
        restrict: 'EAC',
        scope: {
          label: '@',
          labelField: '@',
          provider: '=',
          ngModel: '=?',
          ngValue: '=?',
        },
        require: '?ngModel',
        transclude: false,
        replace: false,
        template: '<div class="selectContainer">'
        + '<label class="item item-input item-stacked-label">'
        + '<span class="input-label">{{label}}</span>'
        + '<div class="item item-input-inset">'
        + '<label class="item-input-wrapper">'
        + '<i class="icon ion-ios7-search placeholder-icon"></i>'
        + '<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
        + '</label>'
        + '<button class="button button-small button-clear" ng-click="open()">'
        + '<i class="icon ion-chevron-down"></i>'
        + '</button>'
        + '</div>'
        + '</label>'
        + '<div class="optionList padding-left padding-right" ng-show="showHide">'
        + '<ion-scroll>'
        + '<ul class="list">'
        + '<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'
        + '</ul>'
        + '</ion-scroll>'
        + '</div>'
        + '</div>',
        link: function (scope, element, attrs, ngModel) {
          scope.ngValue = scope.ngValue !== undefined ? scope.ngValue : 'item';

          scope.selecionar = function (item) {
            ngModel.$setViewValue(item);
            scope.showHide = false;
          };

          element.bind('click', function () {
            element.find('input').focus();
          });

          scope.open = function () {

            scope.ngModel = "";
            return scope.showHide = !scope.showHide;
          };

          scope.onKeyDown = function () {
            scope.showHide = true;
            if (!scope.ngModel) {
              scope.showHide = false;
            }
          };

          scope.$watch('ngModel', function (newValue) {
            if (newValue)
              element.find('input').val(newValue[scope.labelField]);

          });
        }
      }

    }

    //show alert
    function showAlert($ionicPopup) {
      var showAlert = {attention: attention};

      return showAlert;

      function attention(title, template) {
        if (!title)
          title = '<button class="button icon-left button-balanced button-block ion-key">ATENTION</button>';
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: template
        })
      }
    }

    //loading
    function loading($ionicLoading) {
      var loading = {
        show: show,
        hide: hide
      };

      return loading;

      function show(message) {
        $ionicLoading.show({
          template: message
        });
      }

      function hide() {
        $ionicLoading.hide();
      }
    }

    // global variable to keep the airpot list and countries information.
    function airPortList() {
      var airPortList = this;
      airPortList.title = '';

      airPortList.countries = [];
      airPortList.cities = [];
      airPortList.city = {};
      airPortList.isLocation = false;
    }

  })();
