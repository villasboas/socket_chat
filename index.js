var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

//seta as origins permitidas
io.set('origins', 'http://127.0.0.1/');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//sockets
io.on('connection', function(socket){

  //escreve no console quando um usuario se conectar
  console.log('a user connected');
  
  //quando um usuario desconectar
  socket.on('disconnect', function(){

    //manda uma mensagem quando o usuario desconectar
    console.log('user disconnected');
  });

  //quando uma mensagem for enviada
  socket.on('chat message', function(msg){

    //emite a mensagem recebida
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


