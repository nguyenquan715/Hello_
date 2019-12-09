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
		app.post('/api/chat/search/:keyWord',chat.search);
	},
	/*Tạo group mới*/
	createGroup:(app)=>{
		app.post('/api/chat/creategroup',chat.createGroup);
	},
	/*Rời khỏi nhóm*/
	outGroup:(app)=>{
		app.delete('/api/chat/outgroup/:roomId',chat.outGroup);
	}

}