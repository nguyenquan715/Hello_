insert into friends values
	(1,2),
	(1,4),
	(1,5),
	(1,9),
	(2,1),
	(2,3),
	(2,6),
	(2,7),
	(3,2),
	(3,4),
	(3,10),
	(3,8),
	(4,1),
	(4,3),
	(4,6),
	(5,1),
	(6,2),
	(6,4),
	(7,2),
	(8,3),
	(9,1),
	(10,3);

insert into chatrooms values
	(1,'Nguyễn Anh-Chu Vi'),
	(2,'Nguyễn Anh-Phạm Ban'),
	(3,'Nguyễn Anh-Lê Na'),
	(4,'Nguyễn Anh-Pi Pi'),
	(5,'Chu Vi-Pa Tin'),
	(6,'Chu Vi-q q'),
	(7,'Chu Vi-Ka Ka'),
	(8,'Pa Tin-Phạm Ban'),
	(9,'Pa Tin-Mo Mo'),
	(10,'Pa Tin-Phạm Thái'),
	(11,'Phạm Ban-q q');

insert into chatroommembers values
	(1,1),
	(1,2),
	(2,1),
	(2,4),
	(3,1),
	(3,5),
	(4,1),
	(4,9),
	(5,2),
	(5,3),
	(6,2),
	(6,6),
	(7,2),
	(7,7),
	(8,3),
	(8,4),
	(9,3),
	(9,8),
	(10,3),
	(10,10),
	(11,4),
	(11,6);

"select c.chatRoomId,c.chatRoomName,concat(u.lastName,' ',u.firstName) fullName
from chatrooms c
inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId
inner join users u on u.userId=cm.userId
where c.chatRoomId in (select chatRoomId from chatroommembers where userId=1) and u.userId!=1;"


