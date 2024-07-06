const userSearchSchema = require('../../schemas/userSearch.schema');

const validateUserSearch =(req,res,next)=>{
    const {gender,age}= req.query;
    const result = userSearchSchema.validate({gender,age});
    console.log(JSON.stringify(result,null,2));
    if(result.error){
        return res.status(422).json({ messsage: result.error.details[0].message });


    }
}

module.exports = validateUserSearch;

