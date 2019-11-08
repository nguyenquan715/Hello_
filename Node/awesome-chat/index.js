/*External modules*/
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const expressSession=require("express-session");

/*Variables*/
const app=express();
const port=3000;

/*Session configure*/
const session={
 	secret:"asedf9e8374ijdie98asd4fv",
 	cookie:{
 		maxAge:60*60*1000
 	},
 	resave:false,
 	saveUninitialized:false
 };

/*App configure*/
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(expressSession(session));

/*Routes*/
app.get('/',(req,res)=>{
	res.render('index',{title:"Home"});
})

/*Listen*/
var server=app.listen(3000,()=>{
	console.log("Listening at http://localhost:"+port);
});

const io=require('socket.io')(server);
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('nickname',(data)=>{
   	socket.nickname=data;
   });
   socket.on('join_room',(data)=>{
      if(socket.room){
         socket.leave(socket.room);
      }
      socket.room=data;
      socket.join(data);
   });
   socket.on('sendMess',(data)=>{
   	  io.sockets.in(socket.room).emit('resMess','<strong>'+socket.nickname+':</strong>'+'<p>'+data+'</p>');
   });
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});


