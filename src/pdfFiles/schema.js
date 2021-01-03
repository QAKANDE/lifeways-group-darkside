const { model, Schema } = require("mongoose");


const files = new Schema({
    fileUrl: { type: String, required: true },
    serviceUserId : { type: String, required: true },
})

const fileModel = model("files", files);

module.exports = fileModel;