angular.module('starter.controllers', [])

  .controller('ClassCtrl', function ($http, Server, $scope, $ionicModal, $ionicLoading, $ionicPopup, $state) {
    // $http.get(Server.makeUrl("/class"))

    // $scope.classList
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
    $scope.choice=[];
    $scope.checkboxResult = [];
    $scope.describe="";
    // 나중에
    // $scope.count=$scope.countOf($scope.textarea);
    $scope.rating=0;
    $scope.rating_word="";
    // $scope.priceSlider1.value;
    // $scope.priceSlider2.value;


    $scope.ratingsObject = {
      iconOn: 'ion-ios-star',    //Optional
      iconOff: 'ion-ios-star-outline',   //Optional
      iconOnColor: '#213C74',  //Optional
      iconOffColor:  '#213C74',    //Optional
      rating:  -1, //Optional
      minRating:0,    //Optional
      readOnly: true, //Optional
      callback: function(rating) {    //Mandatory
        $scope.rating=rating;
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
    $scope.openClass = function (classNum) {
      var confirmPopup = $ionicPopup.confirm({
        title: '수업 제목',
        template: '25포인트가 소모됩니다. 강의 평가를 확인하시겠습니까?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          location.href = "#/tab/class/" + classNum;
        } else {
          openClassNoPoint();
        }
      });
    };
    var openClassNoPoint = function () {
      var alertPopup = $ionicPopup.alert({
        template: '포인트가 부족합니다.'
      });
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

    $scope.priceSlider1 = {
      value: 1,
      options: {
        showTicks: true,
        floor: 1,
        ceil: 5,
        minLimit: 1,
        maxLimit: 5,
        hidePointerLabels: true,
        hideLimitLabels: true
      }
    };
    $scope.priceSlider2 = {
      value: 1,
      options: {
        showTicks: true,
        floor: 1,
        ceil: 5,
        minLimit: 1,
        maxLimit: 5,
        hidePointerLabels: true,
        hideLimitLabels: true
      }
    };

    /*
     textarea logic
     */
    $scope.countOf = function (text) {
      var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
      var count = s ? s.length : '';
      return count;
    };

    /*
     checkbox logic
     */
    var checkboxCountAlert = function () {
      var alertPopup = $ionicPopup.alert({
        template: '선택된 태그가 너무 많습니다. <br>신중하게 선택해주세요 '
      });
    };

    $scope.checkboxList = ["c1", "c2", "c3"];
    $scope.checkCheckboxCount = function (i) {
      var count = 0;
      if ($scope.checkboxResult[i] == false) {
        return;
      }
      $scope.checkboxResult.forEach(function (item, index) {
        if (item == true) {
          if (count + 1 > 2) {
            checkboxCountAlert();
            $scope.checkboxResult[i] = false;
          } else {
            count++;
          }
        }
      });
    }


    /*
     submit popup
     */
    $scope.submit = function () {

      var checkResult=[];
      $scope.checkboxResult.forEach(function(item,index){
        if(item==true){
          checkResult.push(index);
        }
      });

      var data={
        professor_rate: $scope.priceSlider1.value,
        difficulty: $scope.priceSlider2.value,
        professor: $scope.choice[1],
        attendance: $scope.choice[2],
        grade: $scope.choice[3],
        capacity: $scope.choice[4],
        tags: checkResult.toString(),
        describe: $("#describe").val(),
        rating: $scope.rating,
        userId: "todo",
        classId: "todo"
      };
      var confirmPopup = $ionicPopup.confirm({
        title: '수업평가',
        template: '수업 평가를 등록하시겠습니까?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.showLoading();
          $http.post(Server.makeUrl("/class/assess"),data).success(function(dat){
            $scope.hideLoading();
            $scope.closeModal("add");
          }).error(function(){
            $scope.hideLoading();
            $scope.closeModal("add");
          });
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };

  })
  .controller('NoticeCtrl', function (Server,$http,$scope) {
    $scope.list=[];
    var startVal=0;
    var load=function(start,callback){
      var from=start||0;
      $http.post(Server.makeUrl("/notice/list/"+from),{user:1}).success(function(data){
        $scope.list = $scope.list.concat(data);
        startVal+=10;
        if(callback){
          callback();
        }
      });
    }
    load();
    $scope.loadMore = function () {
      load(startVal,function(){
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };
  })
  .controller('ClassDetailCommentCtrl', function ($scope) {

  })

  .controller('ClassDetailCtrl', function ($http,$scope, $stateParams, $ionicModal) {
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

  .controller('BoardCtrl', function ($ionicNavBarDelegate,Server, $scope, type, $state, $ionicViewSwitcher, $ionicModal, $ionicPopup, $http) {
    $scope.type = type;
    // https://egg-yonsei.appspot.com
    $scope.refresh = function () {
      if (type == "free") {
        $http.get(Server.makeUrl("/board/free_list")).success(function (data) {
          $scope.boardList = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      } else {
        $http.get(Server.makeUrl("/board/council_list")).success(function (data) {
          $scope.boardList = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
    }
    $scope.refresh();

    $scope.canLoadMore = {};
    $scope.canLoadMore['free'] = true;
    $scope.canLoadMore['council'] = true;
    var offset = {};
    offset['free'] = 10;
    offset['council'] = 10;
    $scope.loadMore = function () {
      $http.get(Server.makeUrl("/board/" + type + "_list/" + offset[type])).success(function (data) {
        console.log(data);
        if (data.length == 0) {
          $scope.canLoadMore[$scope.type] = false;
        } else {
          $scope.boardList = $scope.boardList.concat(data);
          offset[type] += 10;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (msg) {
        console.log(msg);
      });
    }
    $scope.go = function (boardId) {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go("board-detail", {boardId: boardId});
    }

    $ionicModal.fromTemplateUrl('templates/modal/board-write.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;

    });
    $scope.openModal = function () {
      $scope.modal.show();
      $ionicNavBarDelegate.showBar(true);
    };
    $scope.imageUrl = 0;
    $scope.openFileDialog = function () {
      window.imagePicker.getPictures(
        function (results) {
          for (var i = 0; i < results.length; i++) {
            var win = function (r) {
              $scope.$apply(function () {
                $scope.imageUrl = JSON.parse(r.response).image;
              });
            }
            var fail = function (error) {
              alert("An error has occurred: Code = " + error.code);
              console.log("upload error source " + error.source);
              console.log("upload error target " + error.target);
            }

            var options = new FileUploadOptions();
            // options.fileKey = "file";
            // options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            // options.mimeType = "text/plain";
            var ft = new FileTransfer();
            ft.upload(results[i], encodeURI(Server.makeUrl("/board/upload")), win, fail, options);
          }
        }, function (error) {
          console.log('Error: ' + error);
        }, {
          maximumImagesCount: 1,
          width: 400,
          height: 400,
          quality: 80
        }
      );
    }
    /*
     submit popup
     */
    $scope.submit = function (board, imageUrl) {
      if (!board.title || !board.body) {
        alert("제목과 내용을 써주세요.");
        return;
      }
      var confirmPopup = $ionicPopup.confirm({
        title: '글 공개',
        template: '글을 업로드 하시겠습니까?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var data = {
            user: 1,
            title: board.title,
            body: board.body,
            type: 1,
            image: imageUrl
          };
          console.log(data);
          // https://egg-yonsei.appspot.com
          $http.post(Server.makeUrl("/board/write"), data).success(function (res) {
            console.log(res.result);
            if (res.result) {
              $scope.board = {};
              $scope.imageUrl = 0;
              $scope.modal.hide();
            } else {
              alert('네트워크 문제로 인해 글이 업로드 되지 않았습니다.');
            }
          })
        } else {
          // 글 공개 보류
        }
      });
    };
    /*
     cancel popup
     */
    $scope.goBack = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '글 작성 취소',
        template: '글 작성을 취소하시겠습니까?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.board = {};
          $scope.imageUrl = 0;
          $scope.modal.hide();
        } else {
          console.log('You are not sure');
        }
      });
    };
  })
  .controller('BoardDetailCtrl', function (Server, $scope, $state, $ionicViewSwitcher, $stateParams, $http, $ionicScrollDelegate) {
    $http.get(Server.makeUrl("/board/watch/") + $stateParams.boardId).success(function (data) {
      $scope.data = data;
    });
    $http.get(Server.makeUrl("/board/comment/") + $stateParams.boardId).success(function (data) {
      $scope.commentList = data;
      console.log("load more init");
      $scope.canLoadMore = true;
    });
    // $scope.goBack=function(){
    //   // $ionicViewSwitcher.nextDirection('back');
    //   // $state.go("tab.board.free");
    // }
    $scope.likeBtn = function () {
      var data = {
        board: $stateParams.boardId,
        user: 1
      };
      $http.post(Server.makeUrl("/board/like"), data).success(function (data) {
        if (data.like) {
          // $scope.$apply(function(){
          $scope.data.heart++;
          // });
        } else {
          // $scope.$apply(function(){
          $scope.data.heart--;
          // });
        }
      })
    }
    var offset = 10;
    $scope.canLoadMore = false;
    $scope.loadMore = function () {
      console.log("more");
      $http.get(Server.makeUrl("/board/comment/") + $stateParams.boardId + "/" + offset).success(function (data) {
        console.log(data);
        if (data.length < 10) {
          console.log("oring");
          $scope.commentList = $scope.commentList.concat(data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.canLoadMore = false;
        } else {
          console.log("no oring");
          $scope.commentList = $scope.commentList.concat(data);
          offset += 10;
        }
      });
    }
    $scope.submitComment = function (boardId) {
      var data = {};
      data.body = $scope.newComment_body;
      $scope.newComment_body = "";
      data.user = 1;
      data.board = boardId;
      $http.post(Server.makeUrl("/board/comment"), data).success(function (data) {
        $ionicScrollDelegate.scrollTop(true);
        // $scope.$apply(function(){
        $scope.data.comment++;
        // });
        $http.get(Server.makeUrl("/board/comment/") + $stateParams.boardId).success(function (data) {
          $scope.commentList = data;
          $scope.canLoadMore = true;
          var offset = 10;
        });
      });
    }
  })

  .controller('MypageCtrl', function ($scope, User) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.logout = function () {
      User.logout();
    }
  })

  .controller('LoginCtrl', function ($http, Server, $scope, User, $ionicModal, $ionicLoading) {
    var loginData = {id: "", pw: ""};
    var loadingShow = function () {
      $ionicLoading.show({
        template: '포털 인증 중...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });
    };
    var loadingHide = function () {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
    };
    $scope.login = function (id, pw) {
      if (!id || !pw) {
        alert('학번과 비밀번호를 입력해주세요');
        return;
      }
      loginData.id = id;
      loginData.pw = pw;
      $scope.openModal();
      return;
      // loadingShow();
      // var data={id:$scope.id,pw:$scope.pw};
      // $http.post(Server.makeUrl("/user/login"),data).then(function(res){
      //   loadingHide();
      //   if(res.login){
      //     $scope.openModal();
      //   }else{
      //     alert("포탈인증에 실패하였습니다.");
      //   }
      // });
    }
    $scope.custom = {
      major: "",
      name: ""
    }
    $scope.confirm = function () {
      var data = {
        school_num: loginData.id,
        major: $scope.custom.major,
        username: $scope.custom.nickname
      };
      window.plugins.OneSignal.getIds(function(ids) {
        data.push_id=ids.userId;
        $http.post(Server.makeUrl('/user/register'),data).success(function(dat){
          console.log(dat);
          $scope.closeModal();
          User.login();
        });
      });
    };

    $ionicModal.fromTemplateUrl('templates/modal/login-join.html', function (modal) {
        $scope.modal_join = modal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      });
    $scope.openModal = function (type) {
      $scope.modal_join.show();
    };
    $scope.closeModal = function (type) {
      $scope.modal_join.hide();
    };


  })

