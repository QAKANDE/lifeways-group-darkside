const { model, Schema , mongoose} = require("mongoose");


const financeFiles = new Schema({
    // serviceUserId: mongoose.Schema.ObjectId,
    fileUrl: { type: String, required: true }, 
})

const financeFileModel = model("financePdf", financeFiles);

module.exports = financeFileModel;