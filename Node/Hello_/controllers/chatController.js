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
		let arrId=req.body['ids'];
		console.log(arrId);
		let arr='';
		for(let i=0;i<arrId.length;i++){			
				arr+=arrId[i]+',';
		}
		let query="select f.userId2 userId,concat(u.lastName,' ',u.firstName) fullName "+
		"from users u "+
		"inner join friends f on f.userId2=u.userId "+
		"where f.userId1="+id+" and f.userId2 not in ("+arr+id+")and(u.lastName like '%"+key+"%' or u.firstName like '%"+key+"%');";
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
	},
	/*Rời khỏi nhóm*/
	outGroup:(req,res)=>{
		let roomId=req.params['roomId'];
		let userId=req.session.userId;
		let query=`delete from chatroommembers where chatRoomId=${roomId} and userId=${userId};`;
		models.sequelize.query(query).then(([results,metadata])=>{
			res.status(200).json({response:'Removed group'});
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	},
	/*Thành viên trong group*/
	members:(req,res)=>{
		let roomId=req.params['roomId'];
		let query=`call membersGroup(${roomId});`;
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Thêm thành viên sau khi đã tạo nhóm*/
	addMembers:(req,res)=>{
		let roomId=req.params['roomId'];
		let arr=req.body['ids'];
		let values='';
		for(let i=0;i<arr.length;i++){
			if(i==arr.length-1){
				values+=`(${roomId},${arr[i]},now(),now());`;
			}
			else values+=`(${roomId},${arr[i]},now(),now()),`;
		}
		let query='insert into chatroommembers (chatRoomId,userId,createdAt,updatedAt) values '+values;
		models.sequelize.query(query).then(([results,metadata])=>{
			res.status(200).json({response:'Added to group'});
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Tin nhắn*/
	message:(req,res)=>{
		let content=req.body["mess"];
		let toChatRoom=req.body["roomId"];
		let fromUser=req.session.userId;
		let query=`call newMessage('${content}',${fromUser},${toChatRoom});`;
		models.sequelize.query(query).then(()=>{
			res.send({response:"Send message success!"});
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	},
	/*Load messages*/
	loadMess:(req,res)=>{
		let roomId=req.params["roomId"];
		let query=`call loadMessage(${roomId});`;
		models.sequelize.query(query).then((results)=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}