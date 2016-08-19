angular.module('starter.services', [])
  .service('User', function ($state) {
    this.login = function (data) {
      this.setUID(data.id);
      window.localStorage.major=data.major;
      window.localStorage.school_num=data.school_num;
      window.localStorage.username=data.username;
      window.localStorage.isLogined=true;
      $state.go("tab.class");
    }
    this.logout = function () {
      window.localStorage.isLogined=false;
      $state.go("login");
    }
    this.addPoint=function(num){
      window.localStorage.point=(parseInt(window.localStorage.point)+num).toString();
      return window.localStorage.point;
    }
    this.minusPoint=function(num){
      if(parseInt(window.localStorage.point)<num){
        return -1;
      }else{
        window.localStorage.point=(parseInt(window.localStorage.point)-num).toString();
        return window.localStorage.point;
      }
    }
    this.getPoint=function(){
      return window.localStorage.point;
    }
    this.initPoint=function(){
      window.localStorage.point="0";
    }
    this.setUID=function(uid){
      window.localStorage.uid=uid.toString();
    }
    this.getUID=function(){
      return window.localStorage.uid;
    }
    this.getUser=function(){
      return {
        major:window.localStorage.major,
        school_num:window.localStorage.school_num,
        username:window.localStorage.username
      };
    }
  })
  .service('Server', function () {
    this.makeUrl=function(string){
      return "https://yicstuco.appspot.com"+string;
      // return "localhost:3000"+string;
    }
  })
  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
