
//----------------------NG Lessons --------
//将JS封装成一个闭包是个好习惯？
(function(){
  var gem = { name: 'Azurite', price: 2.95 };    //定义一个对象
  var app = angular.module('gemStore', []);     //开启一个NG app
  app.controller('StoreController',function(){   //定义一个app Controller
    this.product = gem;                          //声明控制器的属性-product   
  });
})();


