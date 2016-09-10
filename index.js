var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
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
		socket.broadcast.emit('chat message', msg);
	})
})

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


