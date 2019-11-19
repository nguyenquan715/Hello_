const notifi=require('../controllers/notifiController.js');
module.exports={
	search:(app)=>{
		app.get('/api/notifi/search/:keyWord',notifi.search);
	}
}