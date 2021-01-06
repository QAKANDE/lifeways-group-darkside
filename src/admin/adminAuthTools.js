const jwt = require("jsonwebtoken");

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



const verifyAdminJWT = () => {

    const verifyAdminJWT = (token) =>
  new Promise((res, rej) => {
    // console.log('*****************************************************************')
    // console.log(token)
    // console.log(process.env.SECRET_KEY)
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) rej(err);
        res(decoded);
        console.log(decoded)
    });
  });

}
