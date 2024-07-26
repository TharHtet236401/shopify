const UsersTB = require("../models/user");

const LIBBY = require("../utils/libby")

let all = async (req,res,next)=>{
    let result = await UsersTB.find().populate('roles')
    LIBBY.fMsg(res,"All users fetch", result)
}

let register = async(req,res)=>{
    req.body.password = LIBBY.encode(req.body.password);
    let saveData = new UsersTB(req.body);
    let result = await saveData.save();
    LIBBY.fMsg(res,"User added", result)
}

let login = async(req,res,next)=>{
    let dbUser = await UsersTB.findOne({phone:req.body.phone})
    if (dbUser){
       if(LIBBY.decode(req.body.password,dbUser.password)){
        let userObj = dbUser.toObject();
        delete userObj.password;
        userObj.token = "";
        userObj.token = LIBBY.genToken(userObj);
        LIBBY.fMsg(res,"success",userObj)
       }else{
        next(new Error("Invalid password"))
       }
    }else{
        next(new Error("User not found"))
    }
}

let userAddRole =async(req,res,next)=>{
    let dbUser = await UsersTB.findById(req.body.userId)

    let found = dbUser.roles.find(rid=>rid.equals(req.body.roleId))
    
    if(found){
    LIBBY.fMsg(res,"Already There",found)
    }else{
    await UsersTB.findByIdAndUpdate(req.body.userId,{$push:{roles:req.body.roleId}})
    let result = await UsersTB.findById(req.body.userId)
    LIBBY.fMsg(res,"Roled Added to User",result)
    }
    
    

    
    
}

module.exports = {all,register,login,userAddRole}