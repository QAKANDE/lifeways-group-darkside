const express = require("express");
const router = express.Router();
const staffs = require("../staff/schema")
const tasksSchema = require("../tasks/schema")
const assignTasks = require('@get-it-done/task-assigner')
const objectId = require('mongodb').ObjectID;



router.get("/tasksAllocation", async (req, res) => {

    const users = []
    const tasks = []
    const task1 = "medication"
    const task2 ="HealthAndSafetyChecks"
    const task3 =  "FinanceChecks"
    const task4 =  "WeeklyShopping"
    const task5 =  "SleepInRoomCleaned"
    const task6 =  "CarChecks"
    const task7 =  "DailyDiaryReview"
    const staff = await staffs.find()
    const staffId = staff.map((id) => {
        users.push(id._id)
    })
    usersShuffled = users.sort(() => 0.5 - Math.random());
    const selectedUsers = usersShuffled.slice(0, 7);
    const props = {
        "tasks": [ 
        task1 , task2 , task3, task4, task5, task6, task7
    ],
    "troopers":selectedUsers,
    "troopersPerTask": 1
}
    const assignments = assignTasks(props)
    tasks.push(assignments)
    const firstTask = { name: "Medication" }
    const secondTask = { name: "Health And Safety Checks" }
    const thirdTask = { name: "Finance Checks" }
    const fourthTask    = { name: "Weekly Shopping" }
    const fifthTask  = { name: "Sleep In Room Cleaned" }
    const sixthTask    = { name: "Car Checks" }
    const seventhTask = { name: "Daily diary Review" }
    const dt = new Date(); 
    const diff = dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1);
    const startOfWeek = new Date(dt.setDate(diff)).toString();
    const weeklyTasks = new tasksSchema()
    weeklyTasks.weekCommencingDate = startOfWeek
    weeklyTasks.tasks.task1._id = objectId(tasks[0].medication[0])
    weeklyTasks.tasks.task2._id = objectId(tasks[0].HealthAndSafetyChecks[0])
    weeklyTasks.tasks.task3._id = objectId(tasks[0].FinanceChecks[0])
    weeklyTasks.tasks.task4._id = objectId(tasks[0].WeeklyShopping[0])
    weeklyTasks.tasks.task5._id = objectId(tasks[0].SleepInRoomCleaned[0])
    weeklyTasks.tasks.task6._id = objectId(tasks[0].CarChecks[0])
    weeklyTasks.tasks.task7._id = objectId(tasks[0].DailyDiaryReview[0])
    weeklyTasks.tasks.task1.push(firstTask)
    weeklyTasks.tasks.task2.push(secondTask)
    weeklyTasks.tasks.task3.push(thirdTask)
    weeklyTasks.tasks.task4.push(fourthTask)
    weeklyTasks.tasks.task5.push(fifthTask)
    weeklyTasks.tasks.task6.push(sixthTask)
    weeklyTasks.tasks.task7.push(seventhTask)
    await weeklyTasks.save()
})
    
router.get("/getTasks", async (req, res) => {
    const dt = new Date() 
    const diff = dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1);
    const startOfWeek = new Date(dt.setDate(diff));
    const alltasks = await tasksSchema.findById("5ff52299bc14c66fbcbe0ce0")
    // const eachWeek = alltasks.filter((each => each.weekCommencingDate === startOfWeek))
    console.log(alltasks)
})

module.exports = router