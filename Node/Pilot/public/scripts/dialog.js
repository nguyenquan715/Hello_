$(document).ready(function(){
	$('.AddChatRoom').on('click',function(){
		$('.DialogGroup').dialog('open');
	});
	$(document).on('click','.AddGroup button',function(){
		$('.DialogGroup').dialog('close');
		$('#InputName').val('');
		$('#MemberFilter').val('');
		$('.MemberAdded').removeClass('MemberAdded')
		$('#Member').html('');
	});
},false);
$('.DialogGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Tạo nhóm'
});