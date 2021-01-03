const { model, Schema } = require("mongoose");

const weeklyAndMonthlyChecks = new Schema(
    {
        allocateTasks: [      
            {
                staff1: String, 
                task1 : String
            },
            {
                staff2: String, 
                task3 : String
            },
            {
                staff3: String, 
                task3 : String
            }
        ]
    })

const taskModel = model("weekAndMonthChecks", weeklyAndMonthlyChecks);

module.exports = taskModel;