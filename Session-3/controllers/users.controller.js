const userData = require("../users.json");
const userSearchSchema = require('../schemas/userSearch.schema');


const validateUser =(gender,age)=>{
    const result = userSearchSchema.validate(gender,age);
    console.log(JSON.stringify(result,null,2));
    return result.error;
}

const verifyAuth =(authorization)=>{
    if(authorization===process.env.PASSWORD) return true;
    return false;
}

const getUsers = (req,res)=>{
    if(!verifyAuth(req.headers.authorization)) 
        return res.status(403).json({messsage: "Unauthorized Request"});
    res.json(userData.data);

};

const getUserByUserId = (req,res)=>{
    console.log(req.params.uuid);
    const reqObject = userData.data.find((user)=> user.login.uuid === req.params.uuid);
    // console.log(reqObject);
    if(reqObject) return res.json(reqObject);
    res.status(404).send({"message": "User could not be found"});
};

const filterByGender = (users,gender)=>{ return users.filter((user)=> user.gender === gender)};
const filterByAge= (users,age)=> users.filter((user)=> user.dob.age === age);

const searchUser = (req,res)=>{
    const {gender,age}= req.query              //object destructing
    
    //req.query is an object which will contain all the query parameters
   // console.log(gender,age);

    // const result=userSearch.validate(req.query);
    // console.log(JSON.stringify(result,null,2));

    const errors = validateUser(gender,age);
    if (errors)
        return res.status(422).json({ messsage: errors.details[0].message });

   

    if(gender && age){

        // if(!["male","female"].includes(gender)) return res.status(400).json({message: "gender should either be male or female"});
        // if(isNaN(age) || (age<=0|| age>100)){
        //     return res.status(400).json({message: "age must be a number and between 1 to 100"})
        // }

       const filteredByGender =filterByGender(userData.data, gender);
       const filteredByage =filterByAge(filteredByGender,parseInt(age));  //here we have passed filteredByGender and not the priginal user data as we are first doing filter by gender and then filtering it by age
       return res.json(filteredByage);

       // we can achieve the same result like
      

    //  return res.send(userData.data.filter(
    //     (user)=> user.gender=== gender && user.dob.age=== parseInt(age)));
    
    }

   if(gender){
        // if(!["male","female"].includes(gender)) return res.status(400).json({message: "gender should either be male or female"});
        return  res.json(userData.data.filter((user)=>user.gender === gender));
    }



    if(age){
        // if(isNaN(age) || (age<=0|| age>100)){
        //     return res.status(400).json({message: "age must be a number and between 1 to 100"})
        // }
        return res.json(userData.data.filter((user)=>user.dob.age === parseInt(age)));
    }

    // else{
    //     return res.status(400 ).json({message: "age or gender not found"});
    // }


} 
module.exports = {getUsers,getUserByUserId,searchUser};