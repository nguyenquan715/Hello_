const auth=require("../controllers/authController.js");

module.exports.home=(app)=>{
	app.get("/",auth.home);
}
module.exports.signUp=(app)=>{
	app.get('/signup',auth.signUp);
}
module.exports.signIn=(app)=>{
	app.get("/signin",auth.signIn);
}