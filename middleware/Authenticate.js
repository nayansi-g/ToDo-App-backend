const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const Protect =(req,res,next)=>{
    console.log("Checking authentication");
    try {
        const {token} = req.headers
        const Varify = jwt.verify(token,"sgfuidgsfiugdilfkusgdfugskj")
        if(Varify){
            next()
        }else{
            res.status(401).json({message:"unauthorised user"})
        }
        
    } catch (error) {
        res.status(401).json({message:"unauthorised user"})
    }
    
} 


module.exports = Protect;