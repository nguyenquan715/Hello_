const notifi=require('../controllers/notifiController.js');
module.exports={
	/*Tìm kiếm user*/
	search:(app)=>{
		app.get('/api/notifi/search/:keyWord',notifi.search);
	},
	/*Id của user*/
	id:(app)=>{
		app.get('/api/notifi/id',notifi.id);
	},
	/*Id của friend*/
	friendId:(app)=>{
		app.get('/api/notifi/friendid',notifi.friendId);
	},
	/*Thêm bạn bè*/
	addFriend:(app)=>{
		app.post('/api/notifi/addfriend',notifi.addFriend);
	},
	/*Hủy kết bạn*/
	unfriend:(app)=>{
		app.delete('/api/notifi/unfriend/:userId',notifi.unfriend);
	},
	/*Thông tin user*/
	info:(app)=>{
		app.get('/api/notifi/info/:id',notifi.info);
	}
}