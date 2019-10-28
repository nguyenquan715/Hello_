module.exports={
	getData:(con,callback)=>{
		con.query("select * from accounts",callback);
	}
	getDataByUsername:(con,data,callback)=>{
		con.query("select * from accounts where username=? and password=?",[data.username,user.password],callback);
	}
	addRecord:(con,data,callback)=>{
		con.query("insert into accounts (username,password,email) values (?,?,?)",[data.username,data.password,data.email],callback);
	}
}