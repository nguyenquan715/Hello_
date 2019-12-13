
const models=require('../models');

module.exports={
	/*Danh sách User*/
	list:(req,res)=>{
		let query='select userId,concat(lastName," ",firstName) fullName,blocked from users;';
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Block user*/
	block:(req,res)=>{
		let id=Number(req.params["id"]);
		models.user.update({blocked:1,updatedAt:Date()},{where:{userId:id}}).then(()=>{
			console.log('Blocked');
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Unlock user*/
	unlock:(req,res)=>{
		let id=Number(req.params["id"]);
		models.user.update({blocked:0,updatedAt:Date()},{where:{userId:id}}).then(()=>{
			console.log('Unlock');
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	}

}