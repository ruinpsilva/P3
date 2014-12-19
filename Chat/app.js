//require express module

//enabling CORS functionality (cross-origin resource sharing)
var cors = require('cors');



var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    //creating the socket funcionality
        //socket.io listens to ann http server object
    io = require('socket.io').listen(server);
    //array to handle the nicknames
    nicknames = [];

server.listen(3000);

 app.use(cors());   //tell the app to use CORS

//create a rout
    //parameters req -> request, res -> response
app.get('/', function(req, res){
   res.sendFile(__dirname + '/indexchat.html');
});

//to receive the event on the server side
//place the socket funcionality in the server side

io.sockets.on('connection', function(socket){
    //callbackis used because we are sending data back to the client throug this function
    socket.on('new user', function(data, callback){
       //checking if the new username is already in our array
        if(nicknames.indexOf(data) != -1){
            callback(false); //this means that the username is in the array
        } else {
            callback(true);
            socket.nickname = data; //storing the nickname in the socket
            nicknames.push(socket.nickname);
            updatesNicknames();
        }
    });
    
    function updatesNicknames(){
        io.sockets.emit('usernames', nicknames);//for all the users update their list of nicknames
    }
    
    //send message function
    socket.on('send message', function(data){
     //the message should go to all the users
       io.sockets.emit('new message', {msg: data, nick: socket.nickname});//by adding the nickname variable to the socket makes it easy to call it if necessary
       //sends the message to all the users beside the one who send it
       //socket.broadcast.emit('new message', data);
   });
    
    
    //eliminate users when they leave the chat
    socket.on('disconnect', function(data){
        if(!socket.nickname) return; //if the user goes to the login page and leaves without entering an username
        nicknames.splice(nicknames.indexOf(socket.nickname), 1); //removes user nickname from array
        updatesNicknames(); //function to update nicknames
    });
});
