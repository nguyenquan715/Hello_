const userPage=require('../controllers/userPageController.js');

var uri='/api/user/';
module.exports={
	//Hiển thị thông tin cá nhân
	info:(app)=>{
		app.get(uri+'information',userPage.info);
	},
	//Hiển thị list friends
	friends:(app)=>{
		app.get(uri+'friends',userPage.friends);
	},
	//Tìm kiếm thành viên cho group
	members:(app)=>{
		app.get(uri+'members/:keyFind',userPage.members);
	},
	//Tạo group chat
	createGroup:(app)=>{
		app.post(uri+'create_group',userPage.createGroup);
	},
	//Hiển thị danh sách các group chat
	groups:(app)=>{
		app.get(uri+'groups',userPage.groups);
	},
	//Hiển thị thành viên theo điều kiện tìm kiếm
	search:(app)=>{
		app.get(uri+'search/:keyFind',userPage.search);
	}
}
