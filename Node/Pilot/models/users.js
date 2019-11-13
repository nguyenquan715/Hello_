module.exports=(sequelize,Sequelize)=>{
	const User=sequelize.define('user',{
		userId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			autoIncrement:true,
			primaryKey:true
		},
		firstName:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		lastName:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		email:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		birthday:{
			type:Sequelize.DATEONLY,
			allowNull:false
		},
		gender:{
			type:Sequelize.BOOLEAN,
			defaultValue:true
		},
		isAdmin:{
			type:Sequelize.BOOLEAN,
			defaultValue:false
		}
	});
	// User.sync({force:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return User;
}