const express = require("express");
const mongoose = require("mongoose");
const serviceUsers = require("./service-users/index")
const files = require("./pdfFiles/index")
const staffMembers = require("./staff/index")
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require("path")
const tasks = require("./tasks/index")
const adminToken = require("./admin/index")
const finance = require("./Finance/index")
const financePdf = require("./financePdf/index")
const listEndpoints = require("express-list-endpoints");



const server = express();

const port = process.env.PORT || 3003;
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '..', 'public')));
server.use("/serviceusers", serviceUsers)
server.use("/staff" , staffMembers)
server.use("/files", files)
server.use("/tasks", tasks)
server.use("/adminToken", adminToken)
server.use("/finance", finance)
server.use("/financePdf" , financePdf)
console.log("Endpoints : ", listEndpoints(server));


mongoose.connect("mongodb://localhost:27017/lifeways-group", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
 