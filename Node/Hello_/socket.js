module.exports={
    socketio:(io)=>{
        io.on('connection',function(socket){
            console.log('A user connected');
            //Tên người dùng
            socket.on('nickname',(name)=>{
                socket.name=name;
            });
            /*Join vào một chatroom*/
            socket.on('joinChatRoom',(roomId)=>{
                if(socket.chatRoom){
                    socket.leave(socket.chatRoom);
                }
                socket.join('room'+roomId);
                socket.chatRoom=roomId;
                console.log('Join room'+socket.chatRoom);
            });
            /*Message*/
            socket.on('message',(mess)=>{
                io.sockets.in('room'+socket.chatRoom).emit('message',`<p><strong>${socket.name}:</strong></p><p>${mess}</p>`);
            });
            //Người dùng sẽ join vào một phòng chỉ của duy nhất họ
            socket.on('privateRoom',(id)=>{
                socket.join('user'+id)
                console.log('Join user'+id);
                socket.userId=id;
            });
            //Gửi lời mời kết bạn
            socket.on('make_friend',(id)=>{
                var obj={};
                obj.senderId=socket.userId;
                obj.receiverId=id;
                obj.name=socket.name;
                io.sockets.in('user'+id).emit('make_friend',obj);
            });
            /*Sau khi được chấp nhận lời mời kết bạn thì sender phải load lại friend*/
            socket.on('reload_friend',(senderId)=>{
                io.sockets.in('user'+senderId).emit('reload_friend',socket.name);
            })
            /*Sau khi một group mới được tạo*/
            socket.on('reload_group',(data)=>{
                if(data==''){
                    io.sockets.in('user'+socket.userId).emit('reload_group','');
                    console.log('To user'+socket.userId);
                }
                else{
                    let arrId=JSON.parse(data);
                    console.log(arrId);
                    io.sockets.in('user'+socket.userId).emit('reload_group','');
                    for(let i=0;i<arrId.length;i++){
                        io.sockets.in('user'+arrId[i]).emit('reload_group','');
                    }
                }		
            });
        });
    }
}