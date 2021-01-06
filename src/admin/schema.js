const { model, Schema, mongoose } = require("mongoose");

const adminTokens = new Schema({
    adminTokenss: {
  type: String,
  createIndexes: { expires: '1m' },
},
})
const adminTokenModel = model("adminToken", adminTokens);

module.exports = adminTokenModel;