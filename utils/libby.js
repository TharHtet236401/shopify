const bcrypt = require("bcryptjs");

let fMsg = (res,msg,result={})=>{
    res.status(200).json({con:true, msg, result})
}


module.exports= {fMsg, 
    encode:(payload)=>{
        return bcrypt.hashSync(payload, 10);
    },
    decode:(payload, hash)=>{
        return bcrypt.compareSync(payload, hash);
    }
}