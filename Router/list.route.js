const router = require('express').Router();

const User = require('../Model/user.model');
const List = require("../Model/list.model");
const mongoose = require('mongoose');



//create
router.post("/addTask", async (req, res) => {
    console.log("Triggering Add Task")
    try {
        const { title, body, user } = req.body;
        const existingUser = await User.findById(user)
        if (existingUser) {
            const list = new List({ title, body, user: new mongoose.Types.ObjectId(user) });
            await list.save().then(() => res.status(200).json({ list }))
            existingUser.list.push(list)
            existingUser.save();

        }

    } catch (error) {
        res.status(404).json({ error: error, message: "list not created" })
    }
})

//update

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
            const updatedList = await List.findByIdAndUpdate(req.params.id, { title, body });
            res.status(200).json({ updatedList: updatedList, message: "list updated successfully" })
    } catch (error) {
        res.status(404).json({ error: error, message: "list not updated" })
    }

})

//getAllList

router.get("/getTask", async (req, res) => {
    try {
        const { id } = req.headers;
        const existingUser = await User.findById(id).populate("list");
        if (existingUser) {
            // const getAllList = await List.find();
            res.status(200).json({ getAllList: existingUser })
        } else {
            res.status(200).json({ message: 'user not found' })
        }

    } catch (error) {
        res.status(404).json({ error: error, message: 'List not found' })
    }
})

//getSingleTask


router.get("/getTask/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const existingTask = await List.findById(id);
        if (existingTask) {
            
            res.status(200).json({ getSingleTask: existingTask })
        } else {
            res.status(200).json({ message: 'Task not found' })
        }

    } catch (error) {
        res.status(404).json({ error: error, message: 'List not found' })
    }
})


//delete

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const userId = req.headers.userid; // Ensure you're passing 'userid' in headers
        const taskId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const existingList = await List.findById(taskId);
        const existingUser = await User.findById(userId);

        if (!existingList || !existingUser) {
            return res.status(404).json({ message: "List or User not found" });
        }

        // Delete the task
        await List.findByIdAndDelete(taskId);

        // Remove the task reference from the user's list array
        existingUser.list.pull(taskId);
        await existingUser.save(); // Ensure save is awaited

        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


module.exports = router;