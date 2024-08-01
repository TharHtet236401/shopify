const Redis = require('./redis');
const UnReadTB = require('../models/unread');
const MessageTB = require('../models/message');

let liveUser = async( socketId,user) =>{
    user ['socketId'] = socketId;
    // console.log(socketId)
    // console.log(user)
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
    if (unreads.length > 0){
        for (let unread of unreads){
            await UnReadTB.findOneAndDelete(unread._id);
            
        }
    }
    socket.emit ("unread", {unreads:unreads.length})
}

let incomingMessage = async(socket,data,io) =>{
    
    let msg = await new MessageTB(data).save();
    let result = await MessageTB.findById(msg._id).populate('from').populate('to');
    
    let online = await Redis.getObj(data.to);
    
    if(online){
        console.log("online")
        io.to(online).emit("message",result)
    }else{
        console.log("offline")
        await new UnReadTB({from:data.from,to:data.to}).save();
    }
   
    
    
}


module.exports = {initialize,sendUnreadMsg}