const express = require("express");
const router = express.Router();
const profileModel = require("../staff/schema");
const { authenticate, refreshToken, generateToken } = require ("../staff/authTools")
const { authorize } = require("../../services/middlewares/authorize")
const { application, json, Router } = require("express");
const serviceUsers = require ("../service-users/schema")


router.get("/", async (req, res, next) => {
  try {
    const users = await profileModel.find();
    res.status(201).send(users);
  } catch (error) {
    next(error);
  }
});

// router.get("/signUp/:userId",  async (req, res, next) => {
//   try {
//     const user = await profileModel.findById(req.params.userId);
//     if (user) {
//       res.send(user);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:email", authorize , async (req, res, next) => {
try {
  const user = await profileModel.find()
    const filteredUser = user.filter((user => user.email === req.params.email))
     if (filteredUser) {       
        if (filteredUser[0].staffToken === "") {
    const serviceUsersArray = await serviceUsers.find()
    const serviceUsersPerHouse = serviceUsersArray.filter((user => user.houseName === filteredUser[0].houseName))
    res.send (serviceUsersPerHouse)
        } 
        else {
            res.send("Staff Token Not Used , Redirect To Token Check Page")
        }
    }
    else {
        res.send("User Not Found")
    }
} catch (error) {
  console.log(error)
}
})

// router.get("/:userId",  async (req, res, next) => {
//   try {
//     const user = await profileModel.findById(req.params.userId);
//       if (user) {
//     const staffHouse = user.houseName
//     const serviceUsersArray = await serviceUsers.find()
//     const serviceUsersPerHouse = serviceUsersArray.filter((user => user.houseName === staffHouse))
//     res.send (serviceUsersPerHouse)
          
//     }
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/register", async (req, res, next) => {
    try {
        staffTok = []
        const staffdetails = req.body.firstName + req.body.lastName + req.body.phoneNumber
        const staffTokenArray = staffdetails.toUpperCase().split("").sort(() => 0.5 - Math.random());
        const selected = staffTokenArray.slice(0, 5);
         req.body = {...req.body , staffToken : selected.sort().join("") }  
    const newUser = new profileModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

router.post("/verifyStaffToken/",  async (req, res, next) => {
    try {
     
      const allUsers = await profileModel.find()
      const foundUser = allUsers.filter((token) => token.staffToken === req.body.staffToken)
        if (foundUser[0].staffToken === "") {
             res.send("Staff Token Has Been Verified Previously")    
        }
        else {
            const deletedStaffToken = await profileModel.findByIdAndUpdate(foundUser[0]._id, { staffToken: "" })
         res.send("Verification Successful")

        }
  } catch (error) {
    next(error);
  }
});

// router.post("/sendemail", async (req, res, next) => {
//   sendmail({
//     from: "Quadri",
//     to: req.body.email,
//     subject: 'test sendmail',
//     text: 'Mail of test sendmail ',
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
//  });
//   res.send("sent")
// })

router.post("/login", async (req, res, next) => {
  try {
   
    const { email, password } = req.body;

    const user = await profileModel.findByCredentials(email, password);
  
    const tokens = await generateToken(user);

    if (user) {
    res.setHeader("Content-Type" , "application/json")
        res.send(tokens)
    }
  } catch (error) {
    next(error);
  }
});
// router.get("/mee", authorize, async (req, res, next) => {
//   try {
//     let user = await profileModel.find();
//     res.send(user);
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.get("/me", authorize, async (req, res, next) => {
//   try {
//    console.log("here")
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const newProfile = new profileModel(req.body);
//     const response = await newProfile.save();
//     res.send(response);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

router.put("/:id", authorize, async (req, res, next) => {
  try {
    const editprofile = await profileModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const edited = await profileModel.findById(req.params.id);
    res.send(edited);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", authorize, async (req, res, next) => {
  try {
    const deleted = await profileModel.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
