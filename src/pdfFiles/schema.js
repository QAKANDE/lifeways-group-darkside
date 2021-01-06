const { model, Schema , mongoose} = require("mongoose");


const files = new Schema({
    // serviceUserId: mongoose.Schema.ObjectId,
    fileUrl: { type: String, required: true }, 
})

const fileModel = model("files", files);

module.exports = fileModel;