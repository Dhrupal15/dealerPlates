// routes/plates.js

const express = require("express");
const router = express.Router();
const Plate = require("../models/Plate");

// Create a new plate
router.post("/", async (req, res, next) => {
  try {
    const plate = await Plate.create(req.body);
    res.status(201).json(plate);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const plates = await Plate.find();
    res.json(plates);
  } catch (err) {
    next(err);
  }
});

// Filter plates by dealership
router.get("/filter", async (req, res, next) => {
  const { dealership } = req.query;
  try {
    const plates = await Plate.find({ dealership });
    res.json(plates);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/logs", async (req, res, next) => {
  try {
    const plate = await Plate.findById(req.params.id, "signInLogs signOutLogs");
    if (!plate) {
      return res.status(404).json({ error: "Plate not found" });
    }
    res.json({
      signInLogs: plate.signInLogs,
      signOutLogs: plate.signOutLogs,
    });
  } catch (err) {
    next(err);
  }
});

// Update a plate
router.put("/:id", async (req, res, next) => {
  try {
    const plate = await Plate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(plate);
  } catch (err) {
    next(err);
  }
});
router.put("/:id/sign-out", async (req, res, next) => {
  console.log(req.body);
  try {
    const { employeeName } = req.body;
    if (!employeeName) {
      return res.status(400).json({ error: "Employee name is required." });
    }

    const plate = await Plate.findByIdAndUpdate(
      req.params.id,
      {
        signedOut: true,
        $push: { signOutLogs: { employeeName } },
      },
      { new: true }
    );
    res.json(plate);
  } catch (err) {
    next(err);
  }
});

// Sign in a plate
router.put("/:id/sign-in", async (req, res, next) => {
  try {
    const { employeeName } = req.body;
    if (!employeeName) {
      return res.status(400).json({ error: "Employee name is required." });
    }

    const plate = await Plate.findByIdAndUpdate(
      req.params.id,
      {
        signedOut: false,
        $push: { signInLogs: { employeeName } },
      },
      { new: true }
    );
    res.json(plate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
