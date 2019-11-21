const notifi=require('../controllers/notifiController.js');
module.exports={
	search:(app)=>{
		app.get('/api/notifi/search/:keyWord',notifi.search);
	},
	id:(app)=>{
		app.get('/api/notifi/id',notifi.id);
	},
	addFriend:(app)=>{
		app.post('/api/notifi/addfriend',notifi.addFriend);
	}
}