const mysql=require("mysql");
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

/*Home Page*/
exports.home=(req,res)=>{
	res.render("index",{title: "Home"});
}

/*Login page*/
exports.login=(req,res)=>{
	res.render("login",{title: "Login"});
}
exports.loginPost=(req,res)=>{
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
}

/*Register page*/
exports.register=(req,res)=>{
	res.render("register",{title:"Register"});
}
exports.regisPost=(req,res)=>{
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
}
/*User page*/
exports.user=(req,res)=>{
	if(req.session.loggedin==2){
		console.log(req.session.cookie);
		res.render("user",{title:"Profile",userProfile:{nickname:'NAQ',country:'VietNam'}});
	}
	else{
		res.send('Please login to view this page!');
	}
	res.end();
}


/*Admin page*/
exports.admin=(req,res)=>{
	if(req.session.loggedin==1){
		console.log(req.session.cookie);
		res.render("admin",{title:"Admin",userProfile:{nickname:'Admin',country:'VietNam'}});
	}
	else{
		res.send("Please login to view this page!");
	}
	res.end();
}

/*Logout*/
exports.logout=(req,res)=>{
	req.session.destroy();
	console.log(req.session);
	res.redirect("/");
	res.end();
}