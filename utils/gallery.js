const fs = require("fs")

let saveFile =(req,res,next)=>{
    const fileName = new Date().valueOf()+"_"+ req.files.testing.name
    req.files.testing.mv(`./uploads/${fileName}`)
    req.body['image'] = fileName
    console.log(req.body);
    next()
}

let saveFiles = (req,res,next)=>{
    let filesName =[];
   console.log(req.files);
   req.files.file.forEach(file=>{
    const filename = new Date().valueOf()+"_"+file.name
    filesName.push(filename)
    file.mv(`./uploads/${filename}`)
    
   })
   req.body['image'] = filesName.join(",");
   next()
}

let deleteFile = (req,res,next)=>{
    fs.unlinkSync(`./uploads/1721286942041_ronaldo.jpg`)
    next()
}
module.exports = {
    saveFiles,
    deleteFile
}

