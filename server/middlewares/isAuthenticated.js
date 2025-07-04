import jwt from "jsonwebtoken";

 const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
          return res.status(401).json({
             message : "User not authenticated",
             success:false
          })
          }
          const decode = await jwt.verify(token, process.env.SECRET_KEY);

          if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
 
        req.id  = decode.userId;
        next();
    }catch(error){
           console.log(error);
           if(error.name === 'TokenExpiredError'){
               return res.status(401).json({
                   success: false,
                   message: "Token expired. Please login again."
               });
           }
           return res.status(401).json({
               success: false,
               message: "Authentication failed"
           });
    }
}

export default isAuthenticated