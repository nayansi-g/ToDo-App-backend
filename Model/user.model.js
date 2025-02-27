const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        return: true
    },
    list: [{
        type: mongoose.Types.ObjectId,
        ref: "List"
    }
    ]
})

module.exports = mongoose.model("User", userSchema);