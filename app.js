const express = require('express');
const app = express();
require("./Connection/Connection")
const cors = require("cors")
const port = process.env.Port || 4000
const Authenticate = require("./middleware/Authenticate")

const user = require('./Router/user.route');
const list = require('./Router/list.route');



app.use(cors());
app.use(express.json());

app.use("/v1", user);
app.use("/v2",Authenticate, list);


app.listen(port, (err) => {
    if (err) {
        console.log("app is not started")
    } else {
        console.log(`app is running on ${port}`)
    }
})

