module.exports=(sequelize,Sequelize)=>{
	const Notification=sequelize.define('notification',{
		ID:{
			type:Sequelize.INTEGER,
			autoIncrement:true,
			allowNull:false,
			primaryKey:true
		},
		toUserId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			references:{
				model:'users',
				key:'userId'
			}
		},
		notifiContent:{
			type:Sequelize.STRING,
			allowNull:false
		},
		fromUser:{
			type:Sequelize.INTEGER,
			allowNull:false,
			references:{
				model:'users',
				key:'userId'
			}
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
	// Notification.sync({force:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return Notification;
}