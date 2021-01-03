const express = require("express");
const router = express.Router();
const serviceUsersModel = require("../service-users/schema");


router.get("/", async (req, res, next) => {
  try {
    const users = await serviceUsersModel.find();
    res.status(201).send(users);
  } catch (error) {
    next(error);
  }
});


router.get("/:userId",  async (req, res, next) => {
  try {
    const user = await serviceUsersModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const newUser = new serviceUsersModel(req.body);
    const { _id } = await newUser.save();
    console.log(newUser._id);
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});



router.post("/", async (req, res, next) => {
  try {
    const newProfile = new serviceUsersModel(req.body);
    const response = await newProfile.save();
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const editprofile = await serviceUsersModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const edited = await serviceUsersModel.findById(req.params.id);
    res.send(edited);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await serviceUsersModel.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;