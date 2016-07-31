angular.module('starter.controllers', [])

  .controller('ClassCtrl', function ($scope, $ionicModal, $ionicLoading) {
    $ionicModal.fromTemplateUrl('templates/modal/class-sort.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal_sort = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modal/class-add.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal_add = modal;
    });

    $scope.openModal = function (type) {
      if (type === "sort") {
        $scope.modal_sort.show();
      } else {

        $scope.modal_add.show();
      }
    };
    $scope.closeModal = function (type) {
      if (type === "sort") {
        $scope.modal_sort.hide();
      } else {
        $scope.modal_add.hide();
      }
    };
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
    };

    $scope.priceSlider = {
      value: 0,
      options: {
        showTicks: true,
        floor: 0,
        ceil: 5,
        minLimit: 0,
        maxLimit: 5,
        hidePointerLabels: true,
        hideLimitLabels: true
      }
    };


  })
  .controller('NoticeCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ClassDetailCtrl', function ($scope, $stateParams) {
    // $scope.chat = Chats.get($stateParams.chatId);
    console.log($stateParams.classId);
    $scope.loadMore = function () {
      console.log("class detail", "load more");
      setTimeout(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, 3000);
    };

    $scope.$on('$stateChangeSuccess', function () {
      $scope.loadMore();
    });
  })

  .controller('BoardCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('MypageCtrl', function ($scope, User) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.logout = function () {
      User.logout();
    }
  })

  .controller('LoginCtrl', function ($scope, User, $ionicModal) {
    // ionic.keyboard.disable();
    $scope.login = function () {
      $scope.openModal();
    }
    $scope.confirm=function(){
      $scope.closeModal();
      User.login();
    }
    $ionicModal.fromTemplateUrl('templates/modal/login-join.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal_join = modal;
    });
    $scope.openModal = function (type) {
      $scope.modal_join.show();
    };
    $scope.closeModal = function (type) {
      $scope.modal_join.hide();
    };
  })

