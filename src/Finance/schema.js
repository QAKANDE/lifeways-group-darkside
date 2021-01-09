const { model, Schema } = require("mongoose");

const financeSchema = new Schema({
    date: { type: String, required: true },
    description: { type: String, required: true },
    receiptURL: { type: String, required: true },
    expenditure: { type: Number, required: true },
    balance: { type: Number, required: true },
    serviceUserId: { type: String, required: true },
    staffId: { type: String, required: true },
    serviceUsername : {type : String , required: true}
} ,   { timestamps: true })


const financeModel = model("finance", financeSchema);

module.exports = financeModel;

