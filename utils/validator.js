const jwt = require ("jsonwebtoken")

module.exports ={
    validateBody: (schema) => {
       return (req,res,next)=>{
        let result =schema.validate(req.body);
        console.log(result)
        if(result.error){
            next(new Error(result.error.details[0].message))
        }
        else{
            // console.log(result)
        }
        next();
       }
    },
    validParams: (schema,name) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${name}`] = req.params[name]; 
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.details[0].message))
            }
            next();
        }
    },
    validateToken:()=>{
        return (req,res,next)=>{
            if(req.headers.authorization){
                let token = req.headers.authorization.split(" ")[1]
                console.log(token)
                let tokenUser = jwt.verify(token,process.env.SECRET_KEY)
                req.body.user = tokenUser.data;
                console.log(req.body)
                next();
            }else{
                next (new Error("No Token and need token"))
            }
            
    }

    }
}