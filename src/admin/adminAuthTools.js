const jwt = require("jsonwebtoken");
const profileModel = require("../staff/schema");


const generateAdminToken = async (user) => {
  try {
    // generate tokens
    const newAccessToken = await generateAdminJwt({ _id: user._id });
     const newUser = await profileModel.findById(user._id);
    newUser.newAccessToken = newAccessToken;
    await newUser.save({ validateBeforeSave: false });
    return {newAccessToken};
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const generateAdminJwt = async (staffData) => {
    const generateJWT = new Promise((resolve, reject) => {
        jwt.sign({
      data: staffData
        }, process.env.SECRET_KEY, { expiresIn: 60 }, (err, token) => {
                if (err) {
                    reject(err)
                }
                if (token) {
                    resolve(token)
                    res.send(token)
                    console.log(token)
                }
    });    
        }) 
}



const verifyAdminJWT = (token) => {
  new Promise((res, rej) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) rej(err);
        res(decoded);
        console.log(decoded)
    });
  });

}

module.exports = { generateAdminToken, verifyAdminJWT };
