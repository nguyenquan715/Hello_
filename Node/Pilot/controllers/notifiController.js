const models=require('../models');

module.exports={
	search:(req,res)=>{
		let keyWord=req.params["keyWord"];
		let id=req.session.userId;
		let query="select userId, concat(lastName,' ',firstName) fullName from users where userId not in("+id+") and (lastName like '%"+keyWord+"%' or firstName like '%"+keyWord+"%')";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	}
}