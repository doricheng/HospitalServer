const router = require("express").Router();
const Order = require("../models/order");

router.get("/order/:id", (req, res) => {
  
  const _id = req.params.id;
  Order.find({ patient: _id })
    .then((order) => {
   
      res.send(order);
    })
    .catch(() => {
      res.status(500).send("Error!");
    });
});

router.post("/order", async (req, res) => {
  const order = new Order(req.body);

  try {
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/order/:id", async (req, res) => {
  let order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    res.status(404).send("Order not found.");
  }

  Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      res.send("Order updated");
    })
    .catch((e) => {
      res.end(e);
    });
});

router.delete("/order/:id", async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });

    if (!order) {
      return res.status(404).send();
    }

    res.send(order);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
