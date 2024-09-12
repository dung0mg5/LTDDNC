const router = require("express").Router();

const { uploadFile } = require("../middlewares/multer");
const { requireAuth } = require("../middlewares/auth");
const {
  createJob,
  getDetailJob,
  searchJobs,
  applyJob,
  getPostedJob
} = require("../controllers/job.controller");
const { jobLimiter } = require("../middlewares/limiter");

router.post("/create", jobLimiter, requireAuth, createJob);
router.get("/search", requireAuth, searchJobs);
router.get("/posted-jobs", requireAuth, getPostedJob)
router.patch("/:jobId/upload-resume", requireAuth, uploadFile, applyJob)
router.get("/:jobId", requireAuth, getDetailJob);

module.exports = router;
