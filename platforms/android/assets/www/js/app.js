// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl:"tabs.html"
        
    })
    
   
    
    .state('tabs.home', {
        url: "/home",
        views: {
            'home-tab': {
                templateUrl: "home.html",
                controller: 'HomeTabCtrl'
            }
        }
    })
    .state('tabs.article',{
        url: "/article",
        views: {
          'article-tab': {
              templateUrl: "article.html",
              controller: 'ArticleTabCtrl'
          }
        }
    })   
//    .state('tabs.about.home', {
//    url: "/home",
//    views: {
//        'home-tab': {
//          templateUrl: "home.html",
//            controller: 'HomeTabCtrl'
//        }
//    }
//    })  
//    .state('tabs.more',{
//        url: "/more",
//        templateUrl: "more.html"
//    })
//    
    .state('tabs.about', {
    url: "/about",
    views: {
        'about-tab': {
          templateUrl: "about.html",
            controller: 'AboutTabCtrl'
        }
    }
    }); 
  
        $urlRouterProvider.otherwise("/tab/home");
})

    .controller('AppCtrl',function($scope,$ionicModal){
      $ionicModal.fromTemplateUrl('modal.html',function(modal){
        $scope.modal = modal;

      },{
          animation: 'slide-in-up',
          scope: $scope   
      })
    $scope.articleId="";    
    $scope.ableToLike = null;   
    var myDataRef = new Firebase('https://blistering-heat-3955.firebaseio.com/');       myDataRef.child("paper").orderByKey().limitToFirst(1).once('child_added', function(snapshot) {
        var message = snapshot.val();
		console.log(message,snapshot.key());   
        $scope.articleId = - snapshot.key();
        $scope.articleTitle = message.title;
        $scope.author = message.author;
        $scope.content = message.content;
        $scope.date = message.date;
        $scope.Day = $scope.date.slice(7,10);
        $scope.dateLeft = $scope.date.substr(4,4)+""+$scope.date.slice(11,$scope.date.length);
        $scope.like = message.like;
        $scope.read = message.read;        
        $scope.headerLikeIcon="ion-heart-broken";    
        $scope.likedIds = localStorage.getItem('likedArticleId');
        $scope.likedIdsArray = new Array();
    //  $scope.checkLocalLikedIds = false; 
        console.log("$scope.likedIds",$scope.likedIds,localStorage.getItem('likedArticleId'));
        if( typeof $scope.likedIds === 'undefined' || $scope.likedIds == null)
        {          
               //localStorage['likedArticleId'] = $scope.articleId+" ";
               $scope.ableToLike = true;
               $scope.headerLikeIcon="ion-heart-broken";
               localStorage['likedArticleId'] = "0";
        } else {
              $scope.likedIdsArray =  $scope.likedIds.split(",");
              console.log("likedIdsArray",$scope.likedIdsArray);
              $scope.likedIdsArray.forEach(function(value){
              console.log("$scope.articleId",$scope.articleId,value);
              if(value == $scope.articleId) {
                   //$scope.checkLocallikedIds = true;   
                  $scope.ableToLike = false;
                  $scope.headerLikeIcon="ion-heart";
                  console.log("有了 $scope.ableToLike", $scope.ableToLike);
    //              console.log("equals", $scope.checkLocallikedIds);
                } else{
                 // $scope.ableToLike = true;  
                  $scope.headerLikeIcon="ion-heart-broken";
                  console.log("还没有了 $scope.ableToLike", $scope.ableToLike);
                }
                  console.log("...value....",value, ",", $scope.articleId);
              });  

    //          if($scope.checkLocalLikedIds == true ){
    //            $scope.ableToLike = false;
    //            $scope.headerLikeIcon="ion-heart";
    //            console.log("有了", $scope.ableToLike);
    //          }
    //          else {
    //            $scope.ableToLike = true;  
    //            $scope.headerLikeIcon="ion-heart-broken";
    //            console.log("还没有了", $scope.ableToLike);
    //          }
          }
         $scope.$apply(); //刷新变量
        });         
    })


.controller('ModalCtrl', function($scope) {
    
    var modalLike = null;
//    $scope.$watch('ableToLike',function(){
//        modalLike = $scope.ableToLike;
//        console.log("modalLike",modalLike);});
    $scope.$watch('ableToLike', function(){ 
            modalLike = $scope.ableToLike;
            console.log("Inner-modalLike",modalLike);
        });
      
    console.log("$scope.ableToLike$scope.ableToLike",$scope.ableToLike);
    console.log("modalLike",modalLike);
    $scope.pressLike = function() { 
      if(modalLike == false) {
        $scope.headerLikeIcon = "ion-heart";
        console.log("you have rated it");
        console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
      } else {
        $scope.headerLikeIcon = "ion-heart";
        localStorage['likedArticleId'] += ","+$scope.articleId;
        console.log("localStorage['likedArticleId']",localStorage['likedArticleId']);
        modalLike = false;  
      }
    $scope.ableToLike = modalLike;                  
    }

  
//        if( $scope.ableToLike == true )
//            $scope.like ++;
//         
//     console.log($scope.like);
//     }
//    $scope.cancel = function() {
//      $scope.modal.hide();
//    };
//  $scope.newUser = {}; 
//  
//  $scope.createContact = function() {
//    console.log('Create Contact', $scope.newUser);
//    $scope.modal.hide();
//  };
  
})


    .controller('ArticleTabCtrl',function($scope){
      $scope.read++;
      console.log("articleRead", $scope.read);
//      $scope.likedIds = localStorage.getItem('likedArticleId');
//      $scope.ableToLike = new Array();
//      if( typeof $scope.likedIds === 'undefined')
//      {          
//           //localStorage['likedArticleId'] = $scope.articleId+" ";
//           $scope.ableToLike[$scope.articleId] = true;
//      }
//      else 
//      {
//          if(likedIds.split(" ").includes($scope.articleId)){
//            $scope.ableToLike[$scope.articleId] = false;
//          }
//          else {
//            $scope.ableToLike[$scope.articleId] = true;              
//          }
//      }
              
          
  /*       
          $scope.likedIds.foreach(function(value){
             if(value == $scope.articleId) {
                 $scope.ableToLike = false;
                 return;
             }         
         });
          
          if(likedIds)
              localStorage['likedArticleId'] += $scope.articleId+",";
       */   
//          console.log("likedIds",$scope.likedIds,$scope.ableToLike);
//      }
 //     console.log(likedIds);
     })

    .controller('HomeTabCtrl',function($scope){
      console.log('HomeTabCtrl');
      $scope.image = {src:'http://attachments.gfan.com/forum/attachments2/day_100615/10061516459aa71c9750a2ca99.jpg' }
    })
    
    .controller('AboutTabCtrl',function($ionicHistory){
      console.log('AboutTabCtrl');
    
       // $ionicHistory.clearCache();
    })
    
  /*  
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/