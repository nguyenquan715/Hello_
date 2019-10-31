/*External modules*/
const express=require("express");
const path=require("path");
const session=require("express-session");
const bodyParser=require("body-parser");
const passport=require("passport");
const models=require("./models");
require("dotenv").config();

/*Variables*/
const app=express();
const port=process.env.PORT||'8000';

/*App Configure*/
app.set('views',path.join(__dirname,"views"));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*Auth Configure*/
app.use(session({secret:"woieiueuudsdfw4932dfsf",resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

/*Sync Database*/
// models.sequelize.sync().then(()=>{
// 	console.log("Sync Database Successful!");
// }).catch((err)=>{
// 	console.log("Sync Database Fail!");
// });

/*Routes*/
var authRoute=require("./routes/authRoute.js");
authRoute.home(app);
authRoute.signUp(app);
authRoute.signIn(app);

/*http://localhost:8000*/
app.listen(port,()=>{
	console.log('http://localhost:'+port);
});

