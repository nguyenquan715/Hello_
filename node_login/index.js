// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const mysql=require("mysql");
const session=require("express-session");
const bodyParser=require("body-parser");
const user=require("./routes/user.js");
const con=require("./config/connect.js");
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
 * Routes Definitions
 */

app.get("/",user.home);

app.get("/login",user.login);

app.get("/register",user.register);

//Login
app.post("/login",user.loginPost);

//Register
app.post("/register",user.regisPost);

app.get("/user",user.user);

app.get("/admin",user.admin);

app.get('/logout',user.logout);
/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
