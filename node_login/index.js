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
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "21111999",
  database: "nodelogin"
});
var conn=false;
con.connect(function(err) {
  if (err) console.log(err);
  else{
  	conn=true;
  }
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

app.get("/register",(req,res)=>{
	res.render("register",{title:"Register"});
});

//Login
app.post("/login",(req,res)=>{
	let userName=req.body.userName;
	let password=req.body.password;
	if(userName && password){
		if(!conn) console.log("Connection Error!");
		if(conn){
			con.query("select * from accounts where username=?and password=?",[userName,password],function(err,result,fields){
				if(err) console.log("Query Error!");
				else{
					if(result.length>0){
						req.session.username=userName;
						if(result[0]["admin"]==1){
							req.session.loggedin=1;
							res.redirect("/admin");
						}
						else{
							req.session.loggedin=2;
							res.redirect("/user");
						}
					}else{
						res.send("Incorrect Username and/or Password!");
					}
					res.end();
				}
			});
		}
	}else{
		res.send("Please enter Username and Password!");
		res.end();
	}
});

//Register
app.post("/register",(req,res)=>{
	let email=req.body.email;
	let username=req.body.userName;
	let password=req.body.password;
	if(email&&username&&password){
		if(!conn) console.log("Connection Error!");
		if(conn){
			con.query("select * from accounts where username=?",[username],(err,result)=>{
				if(err) console.log("Query Fail!");
				else{
					if(result.length>0){
						res.send("Username already existed. Please enter again!");
						res.end();
					}else{
						con.query("insert into accounts (username,password,email) values (?,?,?)",[username,password,email],(err,result)=>{
							if(err) console.log("Insert Fail!");
							else{
								res.redirect("/");
								res.end();
							}
						});
					}
				}
			});
		}
	}else{
		res.send("Please fill that form!");
		res.end();
	}
})

app.get("/user",(req,res)=>{
	if(req.session.loggedin==2){
		res.render("user",{title:"Profile",userProfile:{nickname:'NAQ',country:'VietNam'}});
	}
	else{
		res.send('Please login to view this page!');
	}
	res.end();
});

app.get("/admin",(req,res)=>{
	if(req.session.loggedin==1){
		res.render("admin",{title:"Admin",userProfile:{nickname:'Admin',country:'VietNam'}});
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
