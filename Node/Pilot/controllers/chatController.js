const models=require('../models');

module.exports={
	/* Danh sách bạn bè*/
	friends:(req,res)=>{
		let id=req.session.userId;
		let query=`call listFriend(${id});`
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/* Danh sách group chat*/
	groups:(req,res)=>{
		let userId=req.session.userId;
		let query=`call listGroup(${userId});`
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Tìm thành viên cho group*/
	search:(req,res)=>{
		let key=req.params["keyWord"];
		let id=req.session.userId;
		let query="select f.userId2 userId,concat(u.lastName,' ',u.firstName) fullName "+
		"from users u "+
		"inner join friends f on f.userId2=u.userId "+
		"where f.userId1="+id+" and(lastName like '%"+key+"%' or firstName like '%"+key+"%');";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Tạo group mới*/
	createGroup:(req,res)=>{
		let groupName=req.body["name"];
		let membersId=req.body["ids"];
		let memsId=[];
		memsId.push(req.session.userId);
		for(let i=0;i<membersId.length;i++){
			memsId.push(Number(membersId[i]));
		}
		let type=0;

		/*Tạo chat room*/
		let query1=`insert into chatrooms (chatRoomName,chatRoomType,createdAt,updatedAt) values ('${groupName}',${type},now(),now());`;
		models.sequelize.query(query1).then(([results,metadata])=>{
			let chatRoomId=results;
			let values=``;
			for(let i=0;i<memsId.length;i++){				
				if(i==memsId.length-1){
					values+=`(${chatRoomId},${memsId[i]},now(),now());`;
				}else{
					values+=`(${chatRoomId},${memsId[i]},now(),now()),`;
				}
			}
			let query2="insert into chatroommembers values "+values;
			models.sequelize.query(query2).then(([results,metadata])=>{
				console.log("Insert success!");
				res.end();	
			}).catch((err)=>{
				console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
		});
	}
}