const router = require("express").Router();

const {
  searchUniversity,
  getUniversity,
} = require("../controllers/university.controller");

router.get("/search", searchUniversity);
router.route("/:universityId").get(getUniversity);

module.exports = router;
