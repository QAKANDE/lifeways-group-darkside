const { model, Schema } = require("mongoose");

const weeklyAndMonthlyChecks = new Schema(
    {
        weekCommencingDate : {type : String , required : true} , 
        tasks: {
            task1: [{ name: String }] ,
            task2: [{ name: String }] ,
            task3: [{ name: String }],
            task4: [{ name: String }],
            task5: [{ name: String }],
            task6: [{ name: String }],
            task7: [{name: String}]
        }
})

const taskModel = model("weekAndMonthChecks", weeklyAndMonthlyChecks);

module.exports = taskModel;