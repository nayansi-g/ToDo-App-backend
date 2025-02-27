const router = require('express').Router();
const User = require('../Model/user.model');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


//sign up
router.post("/register", async (req, res) => {
try {
    const { email, userName, password } = req.body;
    console.log({email, userName}, "Data from request");
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    const data = new User({ email, userName, password: hashpassword});

    console.log("DATA", data)
    let avlEmail = await User.findOne({ email });
    let avlUserName = await User.findOne({ userName });

    console.log("EMAIL", avlEmail);
    console.log("Username", avlUserName);
    if (avlEmail || avlUserName) {
        res.status(400).json({ error: "USER_ALREADY_EXIST" });
    } else {
        data.save()
        res.status(200).json({ message: "User Created!"  })
    }
} catch (error) {
    res.status(200).json({ message: "User not found!"})

}
})

//login

router.post("/signin", async (req, res) => {
    try {
        const validUser = await User.findOne({ email: req.body.email }).populate('list');
        if (!validUser) {
            res.status(200).json({ messege: "please sign up first" })
        } else{
            const authUser = bcrypt.compareSync(req.body.password,validUser.password);
            if(authUser){
                let token = jwt.sign({userName:validUser.userName, email:validUser.email},"sgfuidgsfiugdilfkusgdfugskj")
            res.status(200).json({token:token, id: validUser._id})
            }else{
                res.status(401).json({message:"incorrect password"})
            }

        }

    } catch (err) {
        console.log(err)
        res.status(404).json({ messege: "Something went wrong" })
    }
})






module.exports = router;