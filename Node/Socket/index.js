const express=require('express');
const path=require('path');

const app=express();
const port=3000;

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
	res.render('index');
	res.end();
});

var server=app.listen(3000,()=>{
	console.log('http://localhost:3000');
});

const io=require('socket.io')(server);
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('sendMess',(data)=>{
   	  socket.broadcast.emit('resMess',data);
   });
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});
