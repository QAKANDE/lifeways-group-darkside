const { model, Schema } = require("mongoose");


const serviceUserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
        },
      houseName: {
            type: String,
            required : true
        }
  },
  { timestamps: true }
);
const serviceUsersModel = model("service-users", serviceUserSchema);

module.exports = serviceUsersModel;