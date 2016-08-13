//configurações iniciais
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

//pagina principal do site
app.get('/?', function(req, res){
	res.sendFile(__dirname+'/views/index.html');
});

//chama o evento connecto no objeto io
io.on('connection', function(socket){
	
	//ações quando o socket for conectado	
	console.log('A user connected');

	//ações quando o socket for desconectado
	socket.on('disconnect', function(){
		console.log('A user disconnected');
	})

	//recebe as mensagens
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	})
})

//faz o server escutar a porta 3000
http.listen(3000, function(){
	console.log('Listening on port *:3000');
});