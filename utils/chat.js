const Redis = require('./redis');
const UnReadTB = require('../models/unread');
const MessageTB = require('../models/message');

let liveUser = async( socketId,user) =>{
    user ['socketId'] = socketId;
    await Redis.setObj(socketId,user._id);
    await Redis.setObj(user._id,user);
    
}


let initialize = async(io, socket) =>{
    socket.emit("greet",{"name":socket.data.name,"id":socket.data._id})
    socket.emit ("socketId",socket.id)
    socket['currentUserId'] = socket.data._id;
    liveUser(socket.id,socket.data)
    socket.on('unread',(data)=> sendUnreadMsg(socket));
    socket.on ('message',(data)=> incomingMessage(socket,data,io))
}

let sendUnreadMsg = async(socket) =>{
    let unreads = await UnReadTB.find({to:socket.currentUserId});
    console.log(unreads.length)
    if (unreads.length > 0){
        for (let unread of unreads){
            await UnReadTB.findOneAndDelete(unread._id);
        }
    }
  
    socket.emit ("unread", {unreads:unreads.length})
}

let incomingMessage = async(socket,message,io) =>{
    
    let msg = await new MessageTB(message).save();
    let msgResult = await MessageTB.findById(msg._id).populate('from').populate('to');
    let toUser =await Redis.getObj(message.to);
  
    
    if(toUser){
       let toSocket = io.of("/chat").sockets.get(toUser.socketId);
       if(toSocket){
        toSocket.emit("message",msg)
       }else{
        await new UnReadTB({from:message.from,to:message.to}).save();
       }
    }else{
        await new UnReadTB({from:message.from,to:message.to}).save();
    }
    
   
    
    
}


module.exports = {initialize,sendUnreadMsg}