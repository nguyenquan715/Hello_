const chat=require('../controllers/chatController.js');

module.exports={
	/* Danh sách bạn bè*/
	friends:(app)=>{
		app.get('/api/chat/friends',chat.friends);
	},
	/* Danh sách group chat*/
	groups:(app)=>{
		app.get('/api/chat/groups',chat.groups);
	}
}