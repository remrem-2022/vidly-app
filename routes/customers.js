const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

//get all customer
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

//create a customer
router.post("/", async (req, res) => {
  //validate
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

//update
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!customer) res.status(404).send("The customer with the id is not found");
  res.send(customer);
});

// delete
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    res.status(404).send("The customer with the given id was not found");
  res.send(customer);
});

//get customer by id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) res.status(404).send("The customer with the id is not found");
  res.send(customer);
});

module.exports = router;
