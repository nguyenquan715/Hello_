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
routes.user.logout(app);
/*User Page*/
routes.userPage.friends(app);

/*Listen*/
var server=app.listen(port,()=>{
	console.log("Listening at http://localhost:"+port);
});

/*Socket.io*/
const io=require('socket.io')(server);
io.on('connection',function(socket){
	console.log('A user connected');
});


