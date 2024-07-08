const verifyBodyType = (req,res,next)=>{
   // console.log(req.headers);
  
   if(req.headers["content-type"] && req.headers["content-type"] !== "application/json"){
    return res.status(415).send("not a json");  //415- invalid media type

}
   next();

};

module.exports=verifyBodyType;