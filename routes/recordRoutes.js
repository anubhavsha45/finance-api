const express = require("express");

const router = express.Router();

const recordController = require("./../controllers/recordController");

const authController = require("./../controllers/authController");

router.use(authController.protect);

router.get(
  "/",
  authController.restrictTo("admin", "analyst"),
  recordController.getRecords,
);

router.post(
  "/",
  authController.restrictTo("admin"),
  recordController.createRecord,
);

router.patch(
  "/:recordId",
  authController.restrictTo("admin"),
  recordController.updateRecord,
);

router.get(
  "/analyze",
  authController.restrictTo("admin", "analyst"),
  recordController.analyzeRecords,
);

router.get(
  "/dashboard",
  authController.restrictTo("admin", "analyst", "viewer"),
  recordController.dashboardView,
);
