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
routes.user.profile(app);
routes.user.chat(app);
routes.user.notifi(app);
routes.user.admin(app);
routes.user.notFound(app);
routes.user.blocked(app);
routes.user.back(app);
routes.user.signout(app);
/*Notifi*/
routes.notifi.search(app);
routes.notifi.id(app);
routes.notifi.addFriend(app);
routes.notifi.info(app);
/*Chat*/
routes.chat.friends(app);
routes.chat.groups(app);
routes.chat.search(app);
routes.chat.createGroup(app);
routes.chat.removeGroup(app);
/*Profile*/
routes.profile.info(app);
routes.profile.edit(app);
/*Admin*/
routes.admin.list(app);
routes.admin.block(app);
routes.admin.unlock(app);

/*Listen*/
var server=app.listen(port,()=>{
	console.log("Listening at http://localhost:"+port);
});

/*Socket.io*/
const io=require('socket.io')(server);
io.on('connection',function(socket){
	console.log('A user connected');
	//Tên người dùng
	socket.on('nickname',(name)=>{
		socket.name=name;
	});
	//Người dùng sẽ join vào một phòng chỉ của duy nhất họ
	socket.on('private_room',(id)=>{
		socket.join('user'+id)
		console.log('Join user'+id);
		socket.id=id;
	});
	//Gửi lời mời kết bạn
	socket.on('make_friend',(id)=>{
		var obj={};
		obj.senderId=socket.id;
		obj.receiverId=id;
		obj.name=socket.name;
		io.sockets.in('user'+id).emit('make_friend',obj);
	});
	/*Sau khi một group mới được tạo*/
	socket.on('reload_group',(data)=>{
		if(data==''){
			io.sockets.in('user'+socket.id).emit('reload_group','');
			console.log('To user'+socket.id);
		}
		else{
			let arrId=JSON.parse(data);
			console.log(arrId);
			io.sockets.in('user'+socket.id).emit('reload_group','');
			for(let i=0;i<arrId.length;i++){
				io.sockets.in('user'+arrId[i]).emit('reload_group','');
			}
		}		
	});
	
	//Join vào phòng chat bất kì
	socket.on('join_room',(roomId)=>{
		if(socket.room){
			socket.leave(socket.room);
		}
		socket.join('room'+roomId);		
		socket.room='room'+roomId;
		console.log(socket.room);
	});
	//Nhắn tin
	socket.on('send_mess',(msg)=>{
		io.sockets.in(socket.room).emit('res_mess','<p><strong>'+socket.name+': </strong>'+msg+'</p>');
	});

});


