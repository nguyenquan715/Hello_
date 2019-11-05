const userPage=require('../controllers/userPageController.js');

var uri='/api/user/';
exports.friends=(app)=>{
	app.get(uri+'friends',userPage.friends);
}