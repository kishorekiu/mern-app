const exp = require("express");
const mongoClient = require("mongodb").MongoClient;
const app = exp();
const path = require("path");
const port = 4000;
require("dotenv").config();
app.use(exp.static(path.join(__dirname, "./build")));

const dbConnection = process.env.DB_URL;

//connet to db
mongoClient
  .connect(dbConnection)
  .then((client) => {
    //create db object
    const dbObj = client.db("ecomdb");
    //get collection object
    const userCollectionObject = dbObj.collection("usercollection");
    // share collection object
    app.set("userCollectionObject", userCollectionObject);
    console.log("usercollection connected to db successfully");
  })
  .catch((err) => console.log("error in connecting to user db", err));

mongoClient
  .connect(dbConnection)
  .then((client) => {
    const dbObj = client.db("ecomdb");
    const productCollectionObject = dbObj.collection("productcollection");
    app.set("productCollectionObject", productCollectionObject);
    console.log("productcollection connected to db successfully");
  })
  .catch((err) => console.log("error in connecting to product db", err));

//import userApp
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productApi");

//link to routes
app.use("/user", userApp);
app.use("/product", productApp);

app.listen(port, () => console.log(`server running on port ${port}...`));
