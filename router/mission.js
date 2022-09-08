const express = require("express");
const {
  addMission,
  getAllMission,
  updateMission,
} = require("../controller/missionController");
const checkAuth = require("../middlerWare/checkAuth");

const router = express.Router();

router.post("/add", checkAuth, addMission);
router.get("/allmission", getAllMission);
router.put("/update/:id", checkAuth, updateMission);

module.exports = router;
