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
	},
	id:(req,res)=>{
		var obj={};
		obj.id=req.session.userId
		res.send(obj);
		res.end();
	},
	addFriend:(req,res)=>{
		let sender=req.body['sender'];
		let receiver=req.body['receiver'];
		let name=req.body['name'];
		console.log(sender+' '+receiver+' '+name+'-'+req.session.nickname);
		let query1='insert into friends values ('+sender+','+receiver+'),('+receiver+','+sender+');';
		models.sequelize.query(query1).then((result)=>{
			console.log(result);
		}).catch((err)=>{
			console.log(err);
		});
		let query2='insert into chatrooms (chatRoomName) values ("'+name+'-'+req.session.nickname+'");';
		models.sequelize.query(query2).then(([results,metadata])=>{
			let query3='insert into chatroommembers values ('+results+','+receiver+'),('+results+','+sender+');';
			models.sequelize.query(query3).catch((err)=>{
				console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
		});
		res.end();
	}
}