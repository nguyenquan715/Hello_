$(document).ready(function(){

},false);
var socket=io();
$('button#SendMess').on('click',()=>{
	socket.emit('sendMess',$('.EnterMess input').val());
	$('.EnterMess input').val('');	
});
socket.on('resMess',(data)=>{
	$('.Messages').append('<p>'+data+'</p>');
})
