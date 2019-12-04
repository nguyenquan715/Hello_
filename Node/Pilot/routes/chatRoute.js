const chat=require('../controllers/chatController.js');

module.exports={
	/* Danh sách bạn bè*/
	friends:(app)=>{
		app.get('/api/chat/friends',chat.friends);
	},
	/* Danh sách group chat*/
	groups:(app)=>{
		app.get('/api/chat/groups',chat.groups);
	},
	/*Tìm thành viên cho group*/
	search:(app)=>{
		app.get('/api/chat/search/:keyWord',chat.search);
	},
	/*Tạo group mới*/
	createGroup:(app)=>{
		app.post('/api/chat/creategroup',chat.createGroup);
	},
	/*Rời khỏi nhóm*/
	removeGroup:(app)=>{
		app.delete('/api/chat/removegroup/:roomId',chat.removeGroup);
	}

}