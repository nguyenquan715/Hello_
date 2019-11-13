/*External modules*/
const express=require("express");
const path=require("path");

/*Variables*/
const app=express();
const port=process.env.PORT||'8000';

/*App configure*/
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
	res.render('index',{title:'Home'});
});
app.get('/admin',(req,res)=>{
	res.render('admin',{title:'Admin'});
});
app.get('/chat',(req,res)=>{
	res.render('chat',{title:'Chat'});
});
app.get('/notifi',(req,res)=>{
	res.render('notifi',{title:'Notification'});
});
app.get('/profile',(req,res)=>{
	res.render('profile',{title:'Profile'});
});
app.get('/signin',(req,res)=>{
	res.render('signin',{title:'Sign In'});
});
app.get('/signup',(req,res)=>{
	res.render('signup',{title:'Sign Up'});
});


/*Listen*/
var server=app.listen(port,()=>{
	console.log("Listening at http://localhost:"+port);
});



