const exp = require("express");
const userApp = exp.Router();
userApp.use(exp.json());
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//create middleware function
// const middleware = (request, response, next) => {
//   console.log("middleware executed");
//   next();
// };

// userApp.use(middleware);

// userApp.get("/get-users", async (request, response) => {
//   //get usercollection object
//   const userCollectionObject = request.app.get("userCollectionObject");
//   //get data using find() method
//   const users = await userCollectionObject.find().toArray();
//   //send response
//   response.send({ message: "all users", payload: users });
// });
// userApp.get("/get-user/:id", async (request, response) => {
//   const userCollectionObject = request.app.get("userCollectionObject");
//   const userId = +request.params.id;
//   const user = await userCollectionObject.findOne({ id: userId });
//   response.send({ message: "one user", payload: user });
// });
userApp.post("/create-user", async (request, response) => {
  const userCollectionObject = request.app.get("userCollectionObject");
  const userObj = request.body;
  //check for deuplicate usernames
  const userAlreadyInDB = await userCollectionObject.findOne({
    username: userObj.username,
  });
  if (userAlreadyInDB !== null) {
    response.send({ message: "Username not available...try other username" });
  } else {
    let hashPassword = await bcryptjs.hash(userObj.password, 6);
    userObj.password = hashPassword;
    await userCollectionObject.insertOne(userObj);
    response.send({ message: "User Created" });
  }
});
// userApp.put("/update-user", async (request, response) => {
//   const userCollectionObject = request.app.get("userCollectionObject");
//   const userObj = request.body;
//   await userCollectionObject.updateOne(
//     { username: userObj.username },
//     { $set: { ...userObj } }
//   );
// });
// userApp.delete("/remove-user/:id", async (request, response) => {
//   const userCollectionObject = request.app.get("userCollectionObject");
//   const userId = +request.params.id;
//   const user = await userCollectionObject.deleteOne({ id: userId });
//   response.send({ message: "User Deleted" });
// });

userApp.post("/login", async (request, response) => {
  const userCollectionObject = request.app.get("userCollectionObject");
  const userCredentialObject = request.body;
  const user = await userCollectionObject.findOne({
    username: userCredentialObject.username,
  });
  //if username not exist
  if (user === null) {
    response.send({ message: "invalid username" });
  }
  //if user exist
  else {
    const isTrue = await bcryptjs.compare(
      userCredentialObject.password,
      user.password
    );
    //if password invalid
    if (isTrue !== true) {
      response.send({ message: "invalid password" });
    } else {
      let token = jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: 20,
        }
      );
      response.send({
        message: "success",
        token: token,
        userObj: user,
      });
    }
  }
});

//middleware to verifyToken
const verifyToken = (request, response, next) => {
  const token = request.headers.authorization;
  //if token is not there
  if (token === undefined) {
    response.send({ message: "Unauthorized access" });
  } else {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (err) {
      response.send({ message: "Token expired, please re-login" });
    }
  }
};

//protected route
userApp.get("/test", verifyToken, async (request, response) => {
  response.send({ message: "you are accessing protected resource" });
});

//export userApp
module.exports = userApp;
