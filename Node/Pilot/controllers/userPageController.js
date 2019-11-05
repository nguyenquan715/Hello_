const models=require('../models');

module.exports={
	friends:(req,res)=>{
		models.sequelize.query("select * from users").then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}