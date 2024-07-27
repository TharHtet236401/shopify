const UsersTB = require("../models/user");

const LIBBY = require("../utils/libby")

let all = async (req,res,next)=>{
    let result = await UsersTB.find().populate('roles')
    LIBBY.fMsg(res,"All users fetch", result)
}

let register = async(req,res,next)=>{

    let check = await UsersTB.findOne({phone:req.body.phone});
    if (!check){
        req.body.password = LIBBY.encode(req.body.password);
        let saveData = new UsersTB(req.body);
        let result = await saveData.save();
        LIBBY.fMsg(res,"Registered Successfully")
    }else{
        next (new Error("Phone is already existed"))
    }

}

let login = async(req,res,next)=>{
    let dbUser = await UsersTB.findOne({phone:req.body.phone}).populate('roles')
    if (dbUser){
       if(LIBBY.decode(req.body.password,dbUser.password)){
        let userObj = dbUser.toObject();
        delete userObj.password;
        userObj.token = "";
        userObj.token = LIBBY.genToken(userObj);
        LIBBY.fMsg(res,"User Logged In",userObj)
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


let userRemoveRole = async(req,res,next)=>{
    let dbUser = await UsersTB.findById(req.body.userId)
    let found = dbUser.roles.find(rid=>rid.equals(req.body.roleId))
    
    if(!found){
    LIBBY.fMsg(res,"There is not permit like that",found)
    }else{
    await UsersTB.findByIdAndUpdate(req.body.userId,{$pull:{roles:req.body.roleId}})
    let result = await UsersTB.findById(req.body.userId)
    LIBBY.fMsg(res,"Roled Removed From User",result)
    }
}

module.exports = {all,register,login,userAddRole,userRemoveRole}