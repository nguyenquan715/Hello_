$(document).ready(function(){
	var uri="/api/user/";
	xhr=new XMLHttpRequest();
	/**
 	* Hiển thị danh sách bạn bè
 	*/
 	xhr.open('GET',uri+"friends",true);
	xhr.onreadystatechange=()=>{
		if(xhr.readyState==4&&xhr.status==200){
			let response=JSON.parse(xhr.responseText);
			let content='';
			for(let i=0;i<response.length;i++){
				content+='<button class="Friend">'+response[i]["lastName"]+' '+response[i]["firstName"]+'</button></br>';
			}
			$("#Friends").html(content);
		}
	}
	xhr.send();

	/**
	 * Tạo chatroom
	 */
	$(document).on('click','button.Friend',()=>{
		alert('Hello');
	});
	var socket=io();
},false);


