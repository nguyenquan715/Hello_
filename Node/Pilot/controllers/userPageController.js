const models=require('../models');

module.exports={
	//Hiển thị thông tin cá nhân
	info:(req,res)=>{
		let id=req.session.userId;
		let query="select userId,concat(lastName,' ',firstName) fullName, email,birthday,gender "+
		"from users "+
		"where userId="+id+";"
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	},
	//Hiển thị danh sách bạn bè
	friends:(req,res)=>{
		let id=req.session.userId;
		let query="select c.chatRoomId,concat(u.lastName,' ',u.firstName) fullName "+
				  		"from chatrooms c "+
						"inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId "+
						"inner join users u on u.userId=cm.userId "+
						"where c.chatRoomId in (select chatRoomId from chatroommembers where userId="+id+") and u.userId!="+id+" and c.chatRoomType=true;"

		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	//Tìm kiếm thành viên cho group chat
	members:(req,res)=>{
		let key=req.params["keyFind"];
		let id=req.session.userId;
		let query="select userId,concat(lastName,' ',firstName) fullName "+
		"from users "+
		"where userId in(select userId2 from friends where userId1="+id+") and(lastName like '%"+key+"%' or firstName like '%"+key+"%');";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	//Tạo group chat
	createGroup:(req,res)=>{
		let groupName=req.body["groupName"];
		let membersId=req.body["membersId"];
		let memsId=[];
		memsId.push(req.session.userId);
		for(let i=0;i<membersId.length;i++){
			memsId.push(Number(membersId[i]));
		}

		/*Tạo chat room*/
		let query1="insert into chatrooms (chatRoomName,chatRoomType) values ('"+groupName+"',false)";
		models.sequelize.query(query1).then(([results,metadata])=>{
			let chatRoomId=results;
			let obj={chatRoomId:chatRoomId};
			let values='';
			for(let i=0;i<memsId.length;i++){				
				if(i==memsId.length-1){
					values+="("+chatRoomId+","+memsId[i]+");";
				}else{
					values+="("+chatRoomId+","+memsId[i]+"),";
				}
			}
			let query2="insert into chatroommembers values "+values;
			models.sequelize.query(query2).then(([results,metadata])=>{
				console.log("Insert success!");
				res.send(obj);
				res.end();	
			}).catch((err)=>{
				console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Hiển thị các groups chat*/
	groups:(req,res)=>{
		let userId=req.session.userId;
		let query="select c.chatRoomId, c.chatRoomName "+
		"from chatrooms c "+
		"inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId "+
		"inner join users u on u.userId=cm.userId "+
		"where c.chatRoomType=false and cm.userId="+userId;
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	//Hiển thị thành viên theo điều kiện tìm kiếm
	search:(req,res)=>{
		let key=req.params["keyFind"];
		let query="select userId,concat(lastName,' ',firstName) as fullName "+
		"from users "+
		"where userId not in ("+req.session.userId+") and (lastName like '%"+key+"%' or firstName like '%"+key+"%');"
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	}
}