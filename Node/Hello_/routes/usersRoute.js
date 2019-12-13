const user=require('../controllers/usersController.js');

module.exports={
	//Home Page
	home:(app)=>{
		app.get('/',user.home);
	},
	//Hiển thị form đăng kí
	getSignup:(app)=>{
		app.get('/signup',user.getSignup);
	},
	//Đăng kí
	postSignup:(app)=>{
		app.post('/signup',user.postSignup);
	},
	//Hiển thị form đăng nhập
	getSignin:(app)=>{
		app.get('/signin',user.getSignin);
	},
	//Đăng nhập
	postSignin:(app)=>{
		app.post('/signin',user.postSignin);
	},
	//Hiển thị trang người dùng
	profile:(app)=>{
		app.get('/profile',user.profile);
	},
	chat:(app)=>{
		app.get('/chat',user.chat);
	},
	notifi:(app)=>{
		app.get('/notifi',user.notifi);
	},
	//Hiển thị trang admin
	admin:(app)=>{
		app.get('/admin',user.admin);
	},
	//Hiển thị trang nếu có lỗi xảy ra
	notFound:(app)=>{
		app.get('/error',user.notFound);
	},
	blocked:(app)=>{
		app.get('/blocked',user.blocked);
	},
	back:(app)=>{
		app.get('/back',user.back);
	},
	//Đăng xuất
	signout:(app)=>{
		app.get('/signout',user.signout);
	}
}