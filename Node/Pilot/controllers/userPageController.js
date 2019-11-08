const models=require('../models');

module.exports={
	friends:(req,res)=>{
		let id=req.session.userId;
		let query="select c.chatRoomId,concat(u.lastName,' ',u.firstName) fullName "+
				  		"from chatrooms c "+
						"inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId "+
						"inner join users u on u.userId=cm.userId "+
						"where c.chatRoomId in (select chatRoomId from chatroommembers where userId="+id+") and u.userId!="+id+";"

		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}