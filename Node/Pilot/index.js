/*External modules*/
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const expressSession=require("express-session");
const models=require('./models');
require('dotenv').config();

/*Variables*/
const app=express();
const port=process.env.PORT||'8080';

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
app.use(expressSession(session));

/*Sync Database*/
// models.sequelize.sync({alter:true}).then(()=>{
// 	console.log("Sync Database Successful!");
// }).catch((err)=>{
// 	console.log(err);
// });

/*Routes*/
const routes=require('./routes');
/*User*/
routes.user.home(app);
routes.user.getSignup(app);
routes.user.postSignup(app);
routes.user.getSignin(app);
routes.user.postSignin(app);
routes.user.user(app);
routes.user.admin(app);
routes.user.notFound(app);
routes.user.notifi(app);
routes.user.logout(app);
/*User Page*/
routes.userPage.info(app);
routes.userPage.friends(app);
routes.userPage.members(app);
routes.userPage.createGroup(app);
routes.userPage.groups(app);
routes.userPage.search(app);

/*Listen*/
var server=app.listen(port,()=>{
	console.log("Listening at http://localhost:"+port);
});

/*Socket.io*/
const io=require('socket.io')(server);
io.on('connection',function(socket){
	console.log('A user connected');
	socket.on('nickname',(name)=>{
		socket.name=name;
	});
	socket.on('user',(userId)=>{
		socket.userId='user'+userId;
		socket.join('user'+userId);
	});
	socket.on('join_room',(room)=>{
		if(socket.room){
			socket.leave(socket.room);
			socket.emit('refresh','');
		}
		socket.join(room);
		socket.room=room;
	});
	socket.on('make_friend',(id)=>{
		console.log(id);
		io.sockets.in('user'+id).emit('make_friend','<p>'+socket.name+' đã gửi lời mời kết bạn cho bạn.</p>');
	});
	socket.on('reload_group',(data)=>{
		let arrId=JSON.parse(data);
		io.sockets.in(socket.userId).emit('reload_group','');
		for(let i=0;i<arrId.length;i++){
			io.sockets.in('user'+arrId[i]).emit('reload_group','');
		}
	});
	socket.on('send_mess',(msg)=>{
		io.sockets.in(socket.room).emit('res_mess','<p><strong>'+socket.name+': </strong>'+msg+'</p>');
	});

});


