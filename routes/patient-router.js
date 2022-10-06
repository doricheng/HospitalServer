const router = require("express").Router();
const Patient = require("../models/patient");

router.get("/patient", (req, res) => {
  Patient.find({})
    .then((patient) => {
      res.send(patient);
    })
    .catch(() => {
      res.status(500).send("Error!");
    });
});

router.post("/patient", async (req, res) => {
  const patient = new Patient(req.body);

  try {
    await patient.save();
    res.status(201).send(patient);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
