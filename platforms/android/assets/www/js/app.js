// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'starter.services', 'rzModule','ionic-ratings'])

  .run(function ($ionicPlatform,$state) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
        // StatusBar.overlaysWebView(true);
        // StatusBar.style(1); //Light
        // Strange behavior detected. window.plugins doesn't fire up
      }
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        if(jsonData.additionalData.type=="notice"){
          $state.go('tab.notice');
        }else if(jsonData.additionalData.type=="board"){
          $state.go('board-detail',{boardId:jsonData.additionalData.boardId});
        }else if(jsonData.additionalData.type=="point"){
          window.localStorage.point=(parseInt(window.localStorage.point)+jsonData.additionalData.point).toString();
        }
      };
      if(window.plugins){
        window.plugins.OneSignal.init("7ad2ec95-bbbc-4a28-aaf0-097ed2de2177",
          {googleProjectNumber: "901522536554"},
          notificationOpenedCallback);

        // Show an alert box if a notification comes in when the user is in your app.
        window.plugins.OneSignal.enableInAppAlertNotification(true);
      }

    });
  })

  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
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
                return "free";
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
                return "council";
              }
            }
          }
        }
      })
      .state('board-detail', {
        url: '/board/:boardId',
        cache:false,
        templateUrl: 'templates/board-detail.html',
        controller: 'BoardDetailCtrl'
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
  })
  .filter('timeDiff', function() {
  return function( input ) {
    return moment(input).utcOffset("-09:00").fromNow();
  }
});
