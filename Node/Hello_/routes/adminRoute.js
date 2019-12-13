const admin=require('../controllers/adminController.js');

module.exports={
	/* Danh sách user*/
	list:(app)=>{
		app.get('/api/admin/list',admin.list);
	},
	/*Block user*/
	block:(app)=>{
		app.put('/api/admin/block/:id',admin.block);
	},
	/*Unlock user*/
	unlock:(app)=>{
		app.put('/api/admin/unlock/:id',admin.unlock);
	}
}