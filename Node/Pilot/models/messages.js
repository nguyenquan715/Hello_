module.exports=(sequelize,Sequelize)=>{
	const Message=sequelize.define('message',{
		messageId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			autoIncrement:true,
			primaryKey:true
		},
		content:{
			type:Sequelize.STRING
		},
		fromUser:{
			type:Sequelize.INTEGER,
			references:{
				model:'users',
				key:'userId'
			}
		},
		toChatRoom:{
			type:Sequelize.INTEGER,
			references:{
				model:'chatrooms',
				key:'chatRoomId'
			}
		}
	});
	return Message;
}