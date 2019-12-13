module.exports=(sequelize,Sequelize)=>{
	const ChatRoom=sequelize.define('chatRoom',{
		chatRoomId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			autoIncrement:true,
			primaryKey:true
		},
		chatRoomName:{
			type:Sequelize.STRING,
			allowNull:false
		},
		chatRoomType:{
			type:Sequelize.BOOLEAN,
			defaultValue:true
		},
		createdAt:{
			type:Sequelize.DATE,
			defaultValue:Sequelize.NOW
		},
		updatedAt:{
			type:Sequelize.DATE,
			defaultValue:Sequelize.NOW
		}
	});
	// ChatRoom.sync({force:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return ChatRoom;
}