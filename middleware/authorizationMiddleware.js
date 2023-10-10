const authRole =(role)=>{
return (res,req,next)=>{
     if( req,user.role === role){
          next()
     }else{
          res.status(403).json({message: 'Access Denied'})
     }
}
}
module.exports = authRole