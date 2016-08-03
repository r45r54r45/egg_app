// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'starter.services', 'rzModule'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.class', {
        url: '/class',
        views: {
          'tab-class': {
            templateUrl: 'templates/tab-class.html',
            controller: 'ClassCtrl'
          }
        }
      })
      .state('tab.class-detail', {
        url: '/class/:classId',
        views: {
          'tab-class': {
            templateUrl: 'templates/class-detail.html',
            controller: 'ClassDetailCtrl'
          }
        }
      })
      .state('class-detail.comment', {
        url: '/class/:classId/:commentId',
        views: {
          'class-comment': {
            templateUrl: 'templates/modal/class-detail-comment.html',
            controller: 'ClassDetailCommentCtrl'
          }
        }
      })
      .state('tab.notice', {
        url: '/notice',
        views: {
          'tab-notice': {
            templateUrl: 'templates/tab-notice.html',
            controller: 'NoticeCtrl'
          }
        }
      })
      .state('tab.board', {
        url: '/board',
        abstract:true,
        views: {
          'tab-board': {
            templateUrl: 'templates/tab-board.html'
          }
        }
      })
      .state('tab.board.free', {
        url: '/free',
        views: {
          'board-list-free': {
            templateUrl: 'templates/board-list.html',
            controller: 'BoardCtrl',
            resolve:{
              type:function(){
                return 1;
              }
            }
          }
        }
      })
      .state('tab.board.council', {
        url: '/council',
        views: {
          'board-list-council': {
            templateUrl: 'templates/board-list.html',
            controller: 'BoardCtrl',
            resolve:{
              type:function(){
                return 2;
              }
            }
          }
        }
      })
      .state('tab.board-detail', {
        url: '/free/:boardId',
        views: {
          'tab-board': {
            templateUrl: 'templates/board-detail.html',
            controller: 'BoardDetailCtrl'
          }
        }
      })

      .state('tab.mypage', {
        url: '/mypage',
        views: {
          'tab-mypage': {
            templateUrl: 'templates/tab-mypage.html',
            controller: 'MypageCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function () {
      var logged = window.localStorage.isLogined;
      console.log("check logined",logged);
      // Check User logined or not
      if (logged != "true") {
        console.log("login");
        return 'login';
      } else {
        console.log("class");
        return 'tab/class';
      }
    });


  })
  .directive('ratingInfo', function () {
    return {
      // Restrict it to be an attribute in this case
      restrict: 'A',
      // responsible for registering DOM listeners as well as updating the DOM
      link: function (scope, element, attrs) {
        $(element).barrating(scope.$eval(attrs.ratingInfo));
      }
    };
  });
