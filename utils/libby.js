const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

let fMsg = (res,msg,result={})=>{
    res.status(200).json({con:true, msg, result})
}


module.exports= {fMsg, 
    encode:(payload)=>{
        return bcrypt.hashSync(payload, 10);
    },
    comPass: (plain, hash) => bcrypt.compareSync(plain, hash),
    decode:(payload, hash)=>{
        return bcrypt.compareSync(payload, hash);
    },
    genToken:(payload)=>jwt.sign({
        exp:Math.floor(Date.now()/1000)+(60*60*24),
        data:payload
    },process.env.SECRET_KEY) 
}