module.exports={
	home:(req,res)=>{
		res.render("index",{title:"Home"});
	},
	signUp:(req,res)=>{
		res.render("signup",{title:'Sign Up'});
	},
	signIn:(req,res)=>{
		res.render("signin",{title:'Sign In'});
	}
}