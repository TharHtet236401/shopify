let TB = require("../models/role")
let PermitDB = require("../models/permit")
let LIBBY = require("../utils/libby")

let all = async (req, res, next) => {
    try {
        let result = await TB.find().populate('permits')
        LIBBY.fMsg(res, "Roles fetched", result)
    } catch (error) {
        next(error)
    }
}

let one = async(req,res,next)=>{
    try{
        let result = await TB.findById(req.params.id)
        if(!result){
            next(new Error("Role not found"))
        }else{
            LIBBY.fMsg(res,"Role fetched", result)
        }
    }catch(error){
        next(error)
    }
}

let add = async (req, res, next) => {
    try {
        let searchResult = await TB.findOne({ name: req.body.name })
        if (!searchResult) {
           
            let result = await new TB(req.body).save()
            LIBBY.fMsg(res, "Role created", result)
        } else {
            next(new Error("Role already exists"))
        }
    } catch (error) {
        next(error)
    }
}

let patch = async (req, res, next) => {
    try {
        let searchResult = await TB.findById(req.params.id)
        if (!searchResult) {
            next(new Error("Role not found"))
        } else {
            await TB.findByIdAndUpdate(req.params.id, req.body, { new: true })
            let result = await TB.findById(req.params.id)
            LIBBY.fMsg(res, "Role updated", result)
        }
        
    } catch (error) {
        next(error)
    }
}

let drop = async (req,res,next)=>{
    let result = await TB.findById(req.params.id)
    if (!result) { 
        next (new Error("Role not found"))
    }else{
        await TB.findByIdAndDelete(result._id)
        LIBBY.fMsg(res,"Roles deleted", result)
    }
    
}

let addPermit = async(req,res,next)=>{
    try{
        let result = await TB.findByIdAndUpdate(req.body.roleId,{$push:{permits:req.body.permitId}})
        LIBBY.fMsg(res,"Permit added", result)
    }catch(error){
        next(error)
    }
}

let removePermit = async(req,res,next)=>{
    try{
        let result = await TB.findByIdAndUpdate(req.body.roleId,{$pull:{permits:req.body.permitId}})
        LIBBY.fMsg(res,"Permit removed", result)
    }catch(error){
        next(error)
    }
}
module.exports = {
    all,
    add,
    one,
    patch,
    drop,
    addPermit,
    removePermit
}