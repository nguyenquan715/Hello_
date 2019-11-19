const profile=require('../controllers/profileController.js');

module.exports={
	info:(app)=>{
		app.get('/api/profile/info',profile.info);
	},
	edit:(app)=>{
		app.post('/api/profile/edit',profile.edit);
	}
}