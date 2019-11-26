/*Insert vào bảng user*/
DROP procedure insertUser;

DELIMITER $$
create procedure insertUser(firstName varchar(255),lastName varchar(255),email varchar(255),password varchar(255),birthday varchar(255),gender tinyint(1))
	begin 
		insert into users (firstName,lastName,email,password,birthday,gender,createdAt,updatedAt)values 
			(firstName,lastName,email,password,date(birthday),gender,now(),now());
	end$$
DELIMITER;

/*Update vào bảng user*/
DROP procedure updateUser;

DELIMITER $$
create procedure updateUser(id int(11),firstName varchar(255),lastName varchar(255),birthday varchar(255),gender tinyint(1))
	begin 
		update users set firstName=firstName,lastName=lastName,birthday=date(birthday),gender=gender,updatedAt=now() where userId=id;
	end$$
DELIMITER;

/*Insert vào bảng friend*/
DROP procedure insertFriend;

DELIMITER $$
create procedure insertFriend(sender int(11),receiver int(11))
	begin 
		insert into friends values 
			(sender,receiver,now(),now()),
			(receiver,sender,now(),now());
	end$$
DELIMITER;

/*Insert vào bảng chatrooms*/
DROP procedure insertChatroom;

DELIMITER $$
create procedure insertChatroom(chatRoomName varchar(255))
	begin 
		insert into chatrooms (chatRoomName,createdAt,updatedAt) values 
			(chatRoomName,now(),now());
	end$$
DELIMITER;

/*Insert vào bảng chatroommembers*/
DROP procedure insertChatmember;

DELIMITER $$
create procedure insertChatmember(chatRoomId int(11),userId1 int(11),userId2 int(11))
	begin 
		insert into chatroommembers (chatRoomId,userId,createdAt,updatedAt) values 
			(chatRoomId,userId1,now(),now()),
			(chatRoomId,userId2,now(),now());
	end$$
DELIMITER;

/*Danh sách bạn bè*/
DROP procedure listFriend;

DELIMITER $$
create procedure listFriend(id int(11))
	begin 
		select c.chatRoomId,concat(u.lastName,' ',u.firstName) fullName
		from chatrooms c
		inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId
		inner join users u on u.userId=cm.userId 
		where c.chatRoomId in (select chatRoomId from chatroommembers where userId=id) and u.userId!=id and c.chatRoomType=true;
	end$$
DELIMITER;

/*Danh sách group chat*/
DROP procedure listGroup;

DELIMITER $$
create procedure listGroup(id int(11))
	begin 
		select c.chatRoomId, c.chatRoomName
		from chatrooms c 
		inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId 
		inner join users u on u.userId=cm.userId 
		where c.chatRoomType=false and cm.userId=id;
	end$$
DELIMITER;




