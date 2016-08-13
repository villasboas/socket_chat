var app = angular.module('socketApp', []);

//controller do chat
app.controller('chatCtrl', function($scope, socket){

	$scope.lista = [];

	socket.on('chat message', function(msg){
		//adiciona o item enviado
		obj         = {};
		obj.msg 	= msg;
		obj.class 	= "received";

		add(obj);	
	});

	$scope.teste = function(){
		//adiciona o item enviado
		obj         = {};
		obj.msg 	= $scope.msg;
		obj.class 	= "send";

		add(obj);		

		//envia um socket para o servidor
		socket.emit('chat message', $scope.msg);
		$scope.msg = "";
		return false;
	}

	function add(obj){
		$scope.lista.push(obj);
	}
})

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});