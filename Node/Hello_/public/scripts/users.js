$(document).ready(function(){
	var uri="/api/user/";
	var socket=io();
	/**
	 * Hiển thị thông tin cá nhân
	 */
	xhttp=new XMLHttpRequest();
	xhttp.open('GET',uri+"information",true);
	xhttp.send();
	xhttp.onreadystatechange=function(){
		if(this.readyState==4&& this.status==200){
			let my=JSON.parse(this.responseText);
			let myId=my[0]["userId"];
			socket.emit('user',myId);
		}
	}
	/**
 	* Hiển thị danh sách bạn bè
 	*/
 	xhr=new XMLHttpRequest();
 	xhr.open('GET',uri+"friends",true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4&&this.status==200){
			let response=JSON.parse(this.responseText);
			let content='';
			for(let i=0;i<response.length;i++){
				content+='<p class="Room" id="'+response[i]["chatRoomId"]+'">'+response[i]["fullName"]+'</p>';
			}
			$(".ChatRooms").append(content);
		}
	}
	xhr.send();

	/**
	 * Hiển thị các group chat đã join vào
	 */
	xml=new XMLHttpRequest();
	xml.open('GET',uri+'groups',true);
	xml.send();
	xml.onreadystatechange=function(){
		if(this.readyState==4&&this.status==200){
			let response=JSON.parse(this.responseText);
			let content='';
			for(let i=0;i<response.length;i++){
				content+='<p class="Room" id="'+response[i]["chatRoomId"]+'">'+response[i]["chatRoomName"]+'</p>';
			}
			$(".GroupChats").append(content);
		}
	}

	/**
	* Tìm thành viên cho Group
	*/
	$('.GroupMember #MemberFilter').on('blur',function(){
		let text=$('#MemberFilter').val();
		xhr.open('GET',uri+"members/"+text,true);
		xhr.send();
		xhr.onreadystatechange=function(){
			if(this.readyState==4&&this.status==200){
				let res=JSON.parse(this.responseText);
				let content='';
				for(let i=0;i<res.length;i++){
					content+='<p class="MemberFound" id="'+res[i]["userId"]+'">'+res[i]["fullName"]+'</p>';
				}
				$("#Member").html(content);
			}
		}
	});
	/*Tìm bạn bè*/
	$('.Search input').on('blur',function(){
		let text=$('.Search input').val();
		xhr.open("GET",uri+"search/"+text,true);
		xhr.send();
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200){
				let obj=JSON.parse(this.responseText);
				let content='';
				for(let i=0;i<obj.length;i++){
					content+='<p class="Found" id="'+obj[i]["userId"]+'">'+obj[i]["fullName"]+'</p>';
				}
				$(".Search .List").html(content);
			}
		}
	});
	/*Gửi lời mời kết bạn*/
	$(document).on('click','p.Found',function(){
		$(this).addClass("MakeFriend");
		let id=$(this).attr('id');
		socket.emit('make_friend',id);
	});
	socket.on('make_friend',(data)=>{
		$('.GroupChats').append(data);
	});
	/*Thêm thành viên*/
	$(document).on('click','.MemberFound',function(){
		$(this).toggleClass('MemberAdded');
	});
	/*Tạo nhóm*/
	$(document).on('click','.AddGroup button',function(){
		let groupName=$("#InputName").val();
		let members=$('.MemberAdded');
		let membersId=[];
		for(let i=0;i<members.length;i++){
			membersId.push(members[i].getAttribute('id'));
		}
		let obj={
			groupName:groupName,
			membersId:membersId
		}
		let json=JSON.stringify(obj);
		xhr.open('POST',uri+'create_group',true);
		xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
		xhr.send(json);
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200){
				console.log("Create group chat success!");
				socket.emit("reload_group",JSON.stringify(membersId));
			}
		}
	});

	/**
	* Nick name
	*/
	socket.emit('nickname',$('h1.Banner').text());

	/**
	 * Join vào room
	 */
	$(document).on('click','p.Room',function(){
		socket.emit('join_room',$(this).attr('id'));
		let name=$(this).text();
		$('.ChatRoom .ChatRoomName').text(name);
	});

	/**
	 * Load group chat
	 */
	socket.on('reload_group',function(data){
		$(".GroupChats").html('');
		xml.open('GET',uri+'groups',true);
		xml.send();
		xml.onreadystatechange=function(){
			if(this.readyState==4&&this.status==200){
				let response=JSON.parse(this.responseText);
				let content='';
				for(let i=0;i<response.length;i++){
					content+='<p class="Room" id="'+response[i]["chatRoomId"]+'">'+response[i]["chatRoomName"]+'</p>';
				}
				$(".GroupChats").append(content);
			}
		}
	});

	/* Refresh*/
	socket.on('refresh',(data)=>{
		$('.Messages').text('');
	})
	/**
	* Gửi tin nhắn
	*/
	$(document).on('click','#SendMess',function(){
		socket.emit('send_mess',$('.EnterMess input').val());
		$('.EnterMess input').val('');
	});
	/*Nhận tin nhắn*/
	socket.on('res_mess',(msg)=>{
		$('.Messages').append(msg);
	});
},false);


