$('document').ready(function(){

},false);
var nickname=prompt('Please tell me your nick name!');
var socket=io();
socket.emit('nickname',nickname);

$('button#SendMess').on('click',()=>{
	socket.emit('sendMess',$('.EnterMess input').val());
	$('.EnterMess input').val('');	
});

socket.on('resMess',(data)=>{
	$('.Messages').append(data);
});

$('.Room').on('click',function(){
	alert('You want to join '+$(this).attr('id'));
	socket.emit("join_room",$(this).attr('id'));
});
