const express = require("express");
const router = express.Router();
const staffs = require("../staff/schema")
const tasksSchema = require("../tasks/schema")



router.post("/tasksAllocation", async (req, res) => {
    const users = []
    const tasks = ["task 1", "task 2", "task 3"]
    const staff = await staffs.find()
    const staffId = staff.map((id) => {
        users.push(id._id)
    })
    usersShuffled = users.sort(() => 0.5 - Math.random());
    const selectedUsers = usersShuffled.slice(0, 3);
    const user1 = selectedUsers[0]
    const user2 = selectedUsers[1]
    const user3 = selectedUsers[2]
    const task1 = tasks[0]
    const task2 = tasks[1]
    const task3 = tasks[2]
    const allocatedTasks = [
        firstTask = {
        task1 , user1
        },
        secondtas = {
        task2 , user2
        },
        thirdTask = {
        task3 , user3
        }
    ] 

    allocatedTasks.map((task) => {
      
        return req.body = { 
              allocateTasks: [      
            {
                staff1: task.user1, 
                task1 : task.task1
            },
            {
                staff2: task.user2, 
                task3 : task.task2
            },
            {
                staff3: task.user3, 
                task3 : task.task3
            }
        ]
        }
    })
    const tasksInSchema = new tasksSchema(req.body);
    const savedTasks = await tasksInSchema.save();
    console.log(allocatedTasks)
    console.log(savedTasks)
    res.send(savedTasks)
    })

module.exports = router