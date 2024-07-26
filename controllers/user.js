const UsersTB = require("../models/user");
const LIBBY = require("../utils/libby")

let all = async (req,res,next)=>{
    let result = await UsersTB.find()
    LIBBY.fMsg(res,"All users fetch", result)
}

let add = async(req,res)=>{
    req.body.password = LIBBY.encode(req.body.password);
    let saveData = new UsersTB(req.body);
    let result = await saveData.save();
    LIBBY.fMsg(res,"User added", result)
}

let one = async (req,res,next)=>{
    let result = await UsersTB.findById(req.params.id)
    LIBBY.fMsg(res,"User fetch", result)
}

let patch = async (req,res)=>{
    await UsersTB.findByIdAndUpdate(req.params.id, req.body)
    let result = await UsersTB.findById(req.params.id)
    LIBBY.fMsg(res,"User updated", result)
}

let drop = async (req,res)=>{
    let result = await UsersTB.findById(req.params.id)
    await UsersTB.findByIdAndDelete(req.params.id)
    LIBBY.fMsg(res,"User deleted", result)
}
module.exports = {all,add,one,patch,drop}