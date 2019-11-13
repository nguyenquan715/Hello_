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
		}
	});
	// ChatRoom.sync({alter:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return ChatRoom;
}