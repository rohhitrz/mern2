const verifyAuth = (req,res,next)=>{
    if(req.headers.authorization === process.env.PASSWORD) return next();
    return res.status(403).json({message: "unauthorized Request"});
}

module.exports = verifyAuth;



// const verifyAuth =(authorization)=>{
//     if(authorization===process.env.PASSWORD) return true;
//    return false;
// }
