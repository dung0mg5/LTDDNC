const router = require("express").Router();
const {
  getCompany,
  searchCompany,
} = require("../controllers/company.controller");

router.get("/search", searchCompany);
router.route("/:companyId").get(getCompany);

module.exports = router;
