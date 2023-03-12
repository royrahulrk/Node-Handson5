const express=require('express');
const socket=require('socket.io');
const PORT= process.env.PORT ||8080;
const path= require('path');

const app=express();
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'./public/index.html');
})

const server = app.listen(PORT,function(){
    console.log(`I am listening to the port ${PORT}`);
})

const io = socket(server,{cors: {origin:"*"}});

const users = {};

io.on('connection',socket=>{
    //user joins
    socket.on('new-user-joined', name=>{
        console.log(name,'joined the chat.');
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //message is sent
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
    //when we want to disconnect
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
    
})
