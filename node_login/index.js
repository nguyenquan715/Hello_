// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const mysql=require("mysql");
const session=require("express-session");
const bodyParser=require("body-parser");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	secret: 'asiuwedhnmsdfjkasedfwe',
	resave: true,
	saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Connect to database
 */
const connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:'21111999',
	database:'nodelogin'
});
/**
 * Routes Definitions
 */
app.get("/",(req,res)=>{
	res.render("index",{title: "Home"});
});

app.get("/login",(req,res)=>{
	res.render("login",{title: "Login"});
});

app.post("/login",(req,res)=>{
	var userName=req.body.userName;
	var password=req.body.password;
	if(userName && password){
		connection.connect(function(err){
			if(err) console.log("Connection Error!");
			else{
				connection.query("select * from accounts where username=?and password=?",[userName,password],function(err,result,fields){
					if(err) console.log("Query Error!");
					else{
						if(result.length>0){
							req.session.loggedin=true;
							req.session.username=userName;
							res.redirect("/user");
						}else{
							res.send("Incorrect Username and/or Password!");
						}
						res.end();
					}
				});
			}
		});
	}else{
		res.send("Please enter Username and Password!");
		res.end();
	}
});

app.get("/user",(req,res)=>{
	if(req.session.loggedin){
		res.render("user",{title:"Profile",userProfile:{nickname:'NAQ',country:'VietNam'}});
	}
	else{
		res.send('Please login to view this page!');
	}
	res.end();
});

app.get('/logout',(req,res)=>{
	res.redirect("/");
});
/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
