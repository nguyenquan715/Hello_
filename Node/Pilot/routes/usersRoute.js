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
	user:(app)=>{
		app.get('/user',user.user);
	},
	//Hiển thị trang admin
	admin:(app)=>{
		app.get('/admin',user.admin);
	},
	//Hiển thị trang nếu có lỗi xảy ra
	notFound:(app)=>{
		app.get('/error',user.notFound);
	},
	//Notification
	notifi:(app)=>{
		app.get('/notifi',user.notifi);
	},
	//Đăng xuất
	logout:(app)=>{
		app.get('/logout',user.logout);
	}
}