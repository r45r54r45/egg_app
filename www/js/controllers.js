angular.module('starter.controllers', [])

  .controller('ClassCtrl', function ($scope, $ionicModal, $ionicLoading,$ionicPopup,$state) {
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
    /*
     open class popup
     */
    $scope.openClass = function(classNum) {
      var confirmPopup = $ionicPopup.confirm({
        title: '수업 제목',
        template: '25포인트가 소모됩니다. 강의 평가를 확인하시겠습니까?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          location.href="#/tab/class/"+classNum;
        } else {
          openClassNoPoint();
        }
      });
    };
    var openClassNoPoint = function() {
      var alertPopup = $ionicPopup.alert({
        template: '포인트가 부족합니다.'
      });
    };
    // $scope.showLoading = function () {
    //   $ionicLoading.show({
    //     template: 'Loading...'
    //   }).then(function () {
    //     console.log("The loading indicator is now displayed");
    //   });
    // };
    // $scope.hideLoading = function () {
    //   $ionicLoading.hide().then(function () {
    //     console.log("The loading indicator is now hidden");
    //   });
    // };

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

    /*
    textarea logic
     */
    $scope.countOf = function(text) {
      var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
      var count= s ? s.length : '';
      return count;
    };

    /*
     checkbox logic
      */
    var checkboxCountAlert = function() {
      var alertPopup = $ionicPopup.alert({
        template: '선택된 태그가 너무 많습니다. <br>신중하게 선택해주세요 '
      });
    };
    $scope.checkboxResult=[];
    $scope.checkboxList=["c1","c2","c3"];
    $scope.checkCheckboxCount=function(i){
      var count=0;
      if($scope.checkboxResult[i]==false){
        return;
      }
      $scope.checkboxResult.forEach(function(item,index){
        if(item==true){
          if(count+1>2){
            checkboxCountAlert();
            $scope.checkboxResult[i]=false;
          }else{
            count++;
          }
        }
      });
    }


    /*
     submit popup
      */
    $scope.submit = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: '수업평가',
        template: '수업 평가를 등록하시겠습니까?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };

  })
  .controller('NoticeCtrl', function ($scope) {
  })
  .controller('ClassDetailCommentCtrl',function($scope){

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

  .controller('ClassDetailCtrl', function ($scope, $stateParams,$ionicModal) {
    // $scope.chat = Chats.get($stateParams.chatId);
    console.log($stateParams.classId);
    $ionicModal.fromTemplateUrl('templates/modal/class-detail-comment.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
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

  .controller('BoardCtrl', function ($scope,type,$state) {
    $scope.type=type;
    $scope.go=function(){
      console.log("go");
      console.log($state);
      $state.go("tab.board."+type+"-detail",{boardId:4});
    }
  })
  .controller('BoardDetailCtrl',function($scope){

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

