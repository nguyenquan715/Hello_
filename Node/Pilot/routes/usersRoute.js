const user=require('../controllers/usersController.js');

exports.home=(app)=>{
	app.get('/',user.home);
}
/*Sign Up*/
exports.getSignup=(app)=>{
	app.get('/signup',user.getSignup);
}
exports.postSignup=(app)=>{
	app.post('/signup',user.postSignup);
}
/*Sign In*/
exports.getSignin=(app)=>{
	app.get('/signin',user.getSignin);
}
exports.postSignin=(app)=>{
	app.post('/signin',user.postSignin);
}

/*User|Admin*/
exports.user=(app)=>{
	app.get('/user',user.user);
}
exports.admin=(app)=>{
	app.get('/admin',user.admin);
}

/*Error*/
exports.notFound=(app)=>{
	app.get('/error',user.notFound);
}

exports.logout=(app)=>{
	app.get('/logout',user.logout);
}