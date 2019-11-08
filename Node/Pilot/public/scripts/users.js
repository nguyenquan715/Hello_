$(document).ready(function(){
	var uri="/api/user/";
	xhr=new XMLHttpRequest();
	/**
 	* Hiển thị danh sách bạn bè
 	*/
 	xhr.open('GET',uri+"friends",true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4&&this.status==200){
			let response=JSON.parse(this.responseText);
			let content='';
			for(let i=0;i<response.length;i++){
				content+='<p class="Room" id="'+response[i]["chatRoomId"]+'">'+response[i]["fullName"]+'</p>';
			}
			$(".ChatRooms").html(content);
		}
	}
	xhr.send();

	var socket=io();
	/**
	 * Join vào room
	 */
	$(document).on('click','p.Room',function(){
		socket.emit('join_room',$(this).attr('id'));
	});
	$(document).on('click','#SendMess',function(){
		socket.emit('send_mess',$('.EnterMess input').val());
		$('.EnterMess input').val('');
	});
	socket.on('res_mess',(msg)=>{
		$('.Messages').append('<p>'+msg+'</p>');
	});
},false);


