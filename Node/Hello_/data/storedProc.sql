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
create procedure insertChatroom(chatRoomName varchar(255),chatRoomType tinyint(1) )
	begin 
		insert into chatrooms (chatRoomName,chatRoomType,createdAt,updatedAt) values 
			(chatRoomName,chatRoomType,now(),now());
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

/*Danh sách Id bạn bè*/
DELIMITER $$
create procedure listIdFriend(id int(11))
	begin 
		select userId2 from friends where userId1=id;
	end$$

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

/*Danh sách thành viên của Group*/
DELIMITER $$
create procedure membersGroup(chatRoomId int(11))
	begin
		select u.userId,concat(u.lastName,' ',u.firstName) fullName
		from users u
		inner join chatroommembers cm on cm.userId=u.userId
		where cm.chatRoomId=chatRoomId;
	end$$
		



