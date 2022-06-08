const exp = require("express");
const productApp = exp.Router();
productApp.use(exp.json());

//get all  products
productApp.get("/get-products", async (request, response) => {
  const productCollectionObject = request.app.get("productCollectionObject");
  const users = await productCollectionObject.find().toArray();
  response.send({ message: "all products", payload: users });
});

//get one user
productApp.get("/get-product/:id", async (request, response) => {
  const productCollectionObject = request.app.get("productCollectionObject");
  const productId = +request.params.id;
  const product = await productCollectionObject.findOne({ id: productId });
  response.send({ message: "one product", payload: product });
});

//create product
productApp.post("/create-product", async (request, response) => {
  const productCollectionObject = request.app.get("productCollectionObject");
  const newProductObj = request.body;
  await productCollectionObject.insertOne(newProductObj);
  response.send({ message: "product Created" });
});

//Updata product
productApp.put("/update-product", async (request, response) => {
  const productCollectionObject = request.app.get("productCollectionObject");
  const productObj = request.body;
  await productCollectionObject.updateOne(
    { id: productObj.id },
    { $set: { ...productObj } }
  );
  response.send({ message: "product updated" });
});

//delete product
productApp.delete("/remove-product/:id", async (request, response) => {
  const productCollectionObject = request.app.get("productCollectionObject");
  const productId = +request.params.id;
  await productCollectionObject.deleteOne({ id: productId });
  response.send({ message: "product deleted" });
});

module.exports = productApp;
