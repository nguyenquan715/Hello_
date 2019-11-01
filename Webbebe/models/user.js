module.exports=function(sequelize,Sequelize){
	const User=sequelize.define('user',{
		id:{
			type:Sequelize.INTEGER,
			allowNull:false,
			primaryKey:true,
			autoIncrement:true
		},
		firstName:{
			type:Sequelize.STRING,
			allowNull:false
		},
		lastName:{
			type:Sequelize.STRING,
			allowNull:false
		},
		username:{
			type:Sequelize.STRING,
			allowNull:false
		},
		email:{
			type:Sequelize.STRING,
			allowNull:false,
			validate:{
				isEmail:true
			}
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false,
			validate:{
				len:[8,15]
			}
		},
		status:{
			type:Sequelize.ENUM('active','inactive'),
			defaultValue:'active'
		}
	});
	return User;
}	