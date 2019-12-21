/*Insert vào bảng user*/
DROP procedure insertUser;

DELIMITER $$
create procedure insertUser(firstName varchar(255),lastName varchar(255),email varchar(255),password varchar(255),birthday varchar(255),gender tinyint(1))
	begin 
		insert into users (firstName,lastName,email,password,birthday,gender,createdAt,updatedAt)values 
			(firstName,lastName,email,password,date(birthday),gender,now(),now());
	end$$

/*Update vào bảng user*/
DROP procedure updateUser;

DELIMITER $$
create procedure updateUser(id int(11),firstName varchar(255),lastName varchar(255),birthday varchar(255),gender tinyint(1))
	begin 
		update users set firstName=firstName,lastName=lastName,birthday=date(birthday),gender=gender,updatedAt=now() where userId=id;
	end$$

/*Insert vào bảng friend*/
DROP procedure insertFriend;

DELIMITER $$
create procedure insertFriend(sender int(11),receiver int(11))
	begin 
		insert into friends values 
			(sender,receiver,now(),now()),
			(receiver,sender,now(),now());
	end$$

/*Insert vào bảng chatrooms*/
DROP procedure insertChatroom;

DELIMITER $$
create procedure insertChatroom(chatRoomName varchar(255),chatRoomType tinyint(1) )
	begin 
		insert into chatrooms (chatRoomName,chatRoomType,createdAt,updatedAt) values 
			(chatRoomName,chatRoomType,now(),now());
	end$$

/*Insert vào bảng chatroommembers*/
DROP procedure insertChatmember;

DELIMITER $$
create procedure insertChatmember(chatRoomId int(11),userId1 int(11),userId2 int(11))
	begin 
		insert into chatroommembers (chatRoomId,userId,createdAt,updatedAt) values 
			(chatRoomId,userId1,now(),now()),
			(chatRoomId,userId2,now(),now());
	end$$

/*Danh sách bạn bè*/
DROP procedure listFriend;

DELIMITER $$
create procedure listFriend(id int(11))
	begin 
		select u.userId,c.chatRoomId,concat(u.lastName,' ',u.firstName) fullName
		from chatrooms c
		inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId
		inner join users u on u.userId=cm.userId 
		where u.userId in (select userId2 from friends where userId1=id) and c.chatRoomId in (select chatRoomId from chatroommembers where userId=id) and c.chatRoomType=true;
	end$$

/*Hủy kết bạn*/
DROP procedure unfriend;

DELIMITER $$
create procedure unfriend(id1 int(11),id2 int(11))
	begin
		-- declare id int(11) default 0;
		-- select cm.chatRoomId into id
		-- from chatroommembers cm
		-- inner join chatrooms c on c.chatRoomId=cm.chatRoomId
		-- where cm.userId=id1 and cm.chatRoomId in (select chatRoomId from chatroommembers where userId=id2) and c.chatRoomType=true
		-- limit 1;
		-- delete from chatroommembers where chatRoomId=id;
		-- delete from chatrooms where chatRoomId=id;
		delete from friends where (userId1=id1 and userId2=id2) or (userId2=id1 and userId1=id2);
	end$$

/*Đã tồn tại room đó hay chưa*/
DROP procedure roomExisted;

DELIMITER $$
create procedure roomExisted(id1 int(11),id2 int(11))
	begin 
		select cm.chatRoomId
		from chatroommembers cm
		inner join chatrooms c on c.chatRoomId=cm.chatRoomId
		where cm.userId=id1 and cm.chatRoomId in (select chatRoomId from chatroommembers where userId=id2) and c.chatRoomType=true;
	end$$

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

/*Danh sách thành viên của Group*/
DROP procedure membersGroup;

DELIMITER $$
create procedure membersGroup(chatRoomId int(11))
	begin
		select u.userId,concat(u.lastName,' ',u.firstName) fullName
		from users u
		inner join chatroommembers cm on cm.userId=u.userId
		where cm.chatRoomId=chatRoomId;
	end$$

/*Lưu tin nhắn vào DB*/
DROP procedure newMessage;

DELIMITER $$
create procedure newMessage(mess varchar(255),userId int(11),chatRoomId int(11))
	begin
		insert into messages (content,fromUser,toChatRoom,createdAt,updatedAt) 
		values (mess,userId,chatRoomId,now(),now());
	end$$

/*Load tin nhắn từ một chatroom*/
DROP procedure loadMessage;

DELIMITER $$
create procedure loadMessage(chatRoomId int(11))
	begin
		select concat(u.lastName,' ',u.firstName) fullName,m.content
		from messages m
		inner join users u on u.userId=m.fromUser
		where m.toChatRoom=chatRoomId;
	end$$

/*Load thông báo*/
DROP procedure loadNotifi;

DELIMITER $$
create procedure loadNotifi(userId int(11))
	begin
		select n.ID,n.toUserId,n.fromUser,concat(u.lastName,' ',u.firstName) fullName,n.notifiContent
		from notifications n
		inner join users u on u.userId=n.fromUser
		where n.toUserId=userId;
	end$$



