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
// models.user.sync({alter:true}).then(()=>{
// 	console.log('success!');
// }).catch((err)=>{
// 	console.log(err);
// });
// models.chatRoom.sync({alter:true}).then(()=>{
// 	console.log('success!');
// }).catch((err)=>{
// 	console.log(err);
// });
// models.chatRoomMember.sync({alter:true}).then(()=>{
// 	console.log('success!');
// }).catch((err)=>{
// 	console.log(err);
// });
// models.friend.sync({alter:true}).then(()=>{
// 	console.log('success!');
// }).catch((err)=>{
// 	console.log(err);
// });
// models.message.sync({alter:true}).then(()=>{
// 	console.log('success!');
// }).catch((err)=>{
// 	console.log(err);
// });
// models.notification.sync({alter:true}).then(()=>{
// console.log('success!');
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
routes.notifi.friendId(app);
routes.notifi.addFriend(app);
routes.notifi.unfriend(app);
routes.notifi.info(app);
routes.notifi.loadNotifi(app);
/*Chat*/
routes.chat.friends(app);
routes.chat.groups(app);
routes.chat.search(app);
routes.chat.createGroup(app);
routes.chat.outGroup(app);
routes.chat.members(app);
routes.chat.addMembers(app);
routes.chat.message(app);
routes.chat.loadMess(app);
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
var Socketio=require('./socket');
Socketio.socketio(io);

