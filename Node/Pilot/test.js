const express=require('express');
const path=require('path');

app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',(req,res)=>{
	res.render('test');
});

app.listen('5000',()=>{
	console.log("1");
});