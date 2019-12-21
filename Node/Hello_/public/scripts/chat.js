$(document).ready(function(){
	socket=io();
	socket.emit('nickname',$('#Nickname').text());
	/*Join vào một room riêng*/
	$.ajax({
		method:"GET",
		url:"/api/notifi/id",
		dataType:'json'
	}).done(function(res){		
		socket.emit('privateRoom',res['id']);
	});
	/*Hiển thị danh sách Friend*/
	$.ajax({
		method:"GET",
		url:"/api/chat/friends",
		dataType:'json'
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
			room.append('<div class="Avatar"></div><p>'+res[i]["fullName"]+'</p>');
			$('#FriendList').append(room);
		}
	});
	/*Sau khi được đồng ý lời mời kết bạn*/
	socket.on('reload_friend',()=>{
		$.ajax({
			method:"GET",
			url:"/api/chat/friends",
			dataType:'json'
		}).done(function(res){
			$('#FriendList').empty();
			for(let i=0;i<res.length;i++){
				let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
				room.append('<div class="Avatar"></div><p>'+res[i]["fullName"]+'</p>');
				$('#FriendList').append(room);
			}
		});	
	});
	/*Hiển thị danh sách Group*/
	$.ajax({
		method:"GET",
		url:"/api/chat/groups",
		dataType:'json'
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
			room.append('<div class="RoomAcc"><div class="Avatar"></div><p>'+res[i]["chatRoomName"]+'</p></div><div class="GroupAction"><div class="GroupPlus" title="Thêm thành viên"></div><div class="GroupMinus" title="Rời khỏi nhóm"></div></div>');
			$('#GroupList .Rooms').append(room);
		}
	});
	$('#ListFriend').on('click',function(){
		$('#FriendList').toggleClass('Hide');
		$('#GroupList').toggleClass('Hide');
	});
	$('#ListGroup').on('click',function(){
		$('#FriendList').toggleClass('Hide');
		$('#GroupList').toggleClass('Hide');
	});

	/**
	 * Thêm group mới
	 */
	/*Tìm thành viên cho group*/
	$(document).on('keypress','#DiaGroup #FindMember',function(event){
		if(event.keyCode=='13'){
			let keyWord=$(this).val();
			let ids=[];
			$('#DiaGroup .Members .Member').each(function(index,item){
				ids.push($(this).data('userId'));			
			});
			let obj={
				ids:ids
			};
			FindMember('#DiaGroup',keyWord,obj);
		}
	});
	$(document).on('keypress','#DiaAddToGroup #FindToAdd',function(event){
		if(event.keyCode=='13'){
			let keyWord=$(this).val();
			let ids=[];
			$('#DiaAddToGroup .Members .Member').each(function(index,item){
				ids.push($(this).data('userId'));			
			});
			let obj={
				ids:ids
			};
			FindMember('#DiaAddToGroup',keyWord,obj);
		}
	});
	/*Thêm thành viên cho Group*/
	$(document).on('click','.LeftBottom .Member',function(){
		let result=$('<div class="Member"></div>').data('userId',$(this).data('userId'));
		result.append($(this).html());
		$('.DiaMidRight .Members .MembersToAdd').append(result);
		$(this).remove();
	});
	/*Xóa thành viên khỏi group*/
	$(document).on('click','.Members .MembersToAdd .Member',function(){
		$(this).remove();
	});
	/*Tạo nhóm*/
	$(document).on('click','#DiaGroup #CreateGroup',function(){
		let name=$('#DiaGroup #GroupName').val();
		let ids=[];
		$('#DiaGroup .Members .MembersToAdd .Member').each(function(index,item){
			ids.push($(this).data('userId'));			
		});
		let group={
			name:name,
			ids:ids
		}
		$.ajax({
			method:"POST",
			url:"/api/chat/creategroup",
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(group)
		}).done(()=>{
			console.log('Create group success!');
			/*Reset dialog*/
			$('#DiaGroup').dialog('close');
			$('#DiaGroup input').val('');
			$('#DiaGroup .Members .MembersToAdd').html('');
			$('#DiaGroup .LeftBottom').html('');
			/*Phát ra sự kiện load lại group đối với các thành viên trong group*/
			socket.emit("reload_group",JSON.stringify(ids));
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Reload lại các group đã tham gia*/
	socket.on('reload_group',function(data){
		console.log('Reload');
		$.ajax({
			method:"GET",
			url:"/api/chat/groups",
			dataType:'json'
		}).done(function(res){
			$('#GroupList .Rooms').empty();
			for(let i=0;i<res.length;i++){
				let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
				room.append('<div class="RoomAcc"><div class="Avatar"></div><p>'+res[i]["chatRoomName"]+'</p></div><div class="GroupAction"><div class="GroupPlus" title="Thêm thành viên"></div><div class="GroupMinus" title="Rời khỏi nhóm"></div></div>');
				$('#GroupList .Rooms').append(room);
			}
		});
	});
	/**
	 * Thêm thành viên cho nhóm sau khi đã tạo nhóm
	 */
	$(document).on('click','.GroupPlus',function(){
		let roomId=$(this).parent().parent().data('roomId');
		$('#DiaAddToGroup').data('roomId',roomId);
		let nameOfGroup=$(this).parent().parent().find('p').text();
		$('#DiaAddToGroup #NameOfGroup').val(nameOfGroup);
		$.ajax({
			method:'GET',
			url:'/api/chat/members/'+roomId,
			dataType:'json'
		}).done((res)=>{
			$('#DiaAddToGroup .Members .MembersInGroup').empty();
			for(let i=0;i<res.length;i++){
				let result=$('<div class="Member"></div>').data('userId',res[i]["userId"]);
				result.append('<div class="MemAvatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
				$('#DiaAddToGroup .Members .MembersInGroup').append(result);
			}
		}).fail((err)=>{
			console.log(err);
		});
	});
	$(document).on('click','#DiaAddToGroup #AddToGroup',function(){
		let roomId=$('#DiaAddToGroup').data('roomId');
		let ids=[];
		$('#DiaAddToGroup .Members .MembersToAdd .Member').each(function(index,item){
			ids.push($(this).data('userId'));			
		});
		if(ids.length==0){
			$('#DiaAddToGroup').dialog('close');
			$('#DiaAddToGroup input').val('');
			$('#DiaAddToGroup .Members .MembersToAdd').html('');
			$('#DiaAddToGroup .LeftBottom').html('');
			return;
		}
		let obj={
			ids:ids
		}
		$.ajax({
			method:"PUT",
			url:'/api/chat/editgroup/'+roomId,
			contentType:'application/json;charset=utf-8',
			data:JSON.stringify(obj)
		}).done(()=>{
			console.log('Add to group success!');
			/*Reset dialog*/
			$('#DiaAddToGroup').dialog('close');
			$('#DiaAddToGroup input').val('');
			$('#DiaAddToGroup .Members .MembersToAdd').html('');
			$('#DiaAddToGroup .LeftBottom').html('');
			/*Phát ra sự kiện load lại group đối với các thành viên mới được thêm trong group*/
			socket.emit("reload_group",JSON.stringify(ids));
		}).fail((err)=>{
			console.log(err);
		});
	});

	/*Rời khỏi nhóm*/
	$(document).on('click','#DiaOutGroup #Yes_OutGroup',function(){
		let roomId=$(this).parent().parent().data('roomId');
		$.ajax({
			method:'DELETE',
			url:'/api/chat/outgroup/'+roomId
		}).done((res)=>{
			$('#DiaOutGroup').dialog('close');
			console.log(res.response);
			socket.emit("reload_group",'');
		}).fail((err)=>{
			console.log(err);
		})
	});

	/**
	 * Liệt kê thành viên của group
	 */
	$(document).on('click','#GroupList .Room',function(){
		let roomId=$(this).data('roomId');
		$.ajax({
			method:'GET',
			url:'/api/chat/members/'+roomId,
			dataType:'json'
		}).done((res)=>{
			$('.ChatRoomTool .ChatRoomMember').empty();
			for(let i=0;i<res.length;i++){
				let member=$('<div class="Room"></div>').data('userId',res[i]['userId']);
				member.append('<div class="Avatar"></div><p>'+res[i]['fullName']+'</p>');
				$('.ChatRoomTool .ChatRoomMember').append(member);
			}
		}).fail((err)=>{
			console.log(err);
		});
	});

	/*Sự kiện khi nhấn vào một Room*/
	$(document).on('click','.List .Room',function(){
		let roomId=$(this).data('roomId');
		$('.ChatRoom').data('roomId',roomId);
		$('.ChatRoomName').text($(this).find('p').text());		
		socket.emit('joinChatRoom',roomId);
		$('.Messages').empty();
		/*Load message*/
		$.ajax({
			method:"GET",
			url:"/api/chat/message/"+roomId,
			data:"json"
		}).done((res)=>{
			for(let i=0;i<res.length;i++){
				$('.Messages').append(`<p><strong>${res[i]['fullName']}:</strong></p><p>${res[i]['content']}</p>`);
			}
		}).fail((err)=>{
			console.log(err);
		});
	});
	$(document).on('click','#FriendList .Room',function(){
		$('.ChatRoomMember').empty();
	});

	/*Nhắn tin*/
	$(document).on('keypress','#EnterMess',function(event){
		if(event.keyCode=='13'){
			newMessage();
		}
	});
	$(document).on('click','#SendMess',function(){
		newMessage();
	});
	socket.on('message',(mess)=>{
		$('.ChatRoom .Messages').append('<p>'+mess+'</p>');
	});
},false);
function FindMember(dialog,keyWord,obj){
	$.ajax({
		method:"POST",
		url:"/api/chat/search/"+keyWord,
		dataType:"json",
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(obj)
	}).done(function(res){
		$(dialog+' .LeftBottom').html('');
		for(let i=0;i<res.length;i++){
			let result=$('<div class="Member"></div>').data('userId',res[i]["userId"]);
			result.append('<div class="MemAvatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
			$(dialog+' .LeftBottom').append(result);
		}
	}).fail((err)=>{
		console.log(err);
	});
}
/*Insert mess vào database và hiển thị ra*/
function newMessage(){
	let mess=$('#EnterMess').val();
	//Vệ sinh đầu vào tránh lỗi XSS chưa làm
	//Xử lý các dấu ' " `
	let roomId=$('.ChatRoom').data('roomId');
	if(mess){
		let obj={
			mess:mess,
			roomId:roomId
		}
		$.ajax({
			method:"POST",
			url:"/api/chat/message",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify(obj)
		}).done(()=>{
			$('#EnterMess').val('');
			socket.emit('message',mess);
			let blockMess=$('.Messages')[0];
			blockMess.scrollTop=blockMess.scrollHeight;
		}).fail((err)=>{
			console.log(err);
		});
	}	
}