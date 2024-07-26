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
    }


}