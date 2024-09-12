const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Job = require("../models/job.model");
const User = require("../models/user.model");
const cloudinary = require("../../../../config/cloud");
const { model } = require("mongoose");

const createJob = catchAsync(async (req, res, next) => {
  const {
    jobTitle,
    companyId,
    workplaceType,
    jobLocation,
    jobType,
    description,
  } = req.body;

  if (
    !jobTitle ||
    !companyId ||
    !workplaceType ||
    !jobLocation ||
    !jobType ||
    !description
  ) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const newJob = new Job({
    writer: req.user.authenticatedUser._id,
    jobTitle,
    company: companyId,
    workplaceType,
    jobLocation,
    jobType,
    description,
  });

  await newJob.save();

  res.json({ message: "Job is created successfully" });
});

const getDetailJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) return next(new AppError("Please provide job id", 400));

  const job = await Job.findById(jobId).populate("writer").populate("company");
  if (!job) return next(new AppError("Job is not found", 404));

  res.json({
    data: job,
  });
});

const searchJobs = catchAsync(async (req, res, next) => {
  const { jobTitle, jobLocation } = req.query;

  let jobs = await Job.find({
    jobTitle: { $regex: jobTitle, $options: "i" },
    jobLocation: { $regex: jobLocation, $options: "i" },
  })
    .populate("company")
    .populate("writer")
    .populate({
    path: "applicants",
    populate: {
      path: "user",
    },
  })
  .limit(10)
  .lean();

  res.json({ data: jobs });
});

const applyJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const {file} = req;
  const {phone, phoneCountryCode, email} = req.body;

  if (!jobId) return next(new AppError("Please provide job id", 400));

  const job = await Job.findById(jobId);
  if (!job) return next(new AppError("Job is not found", 404));

  const user = await User.findById(req.user.authenticatedUser._id);
  if (!user) return next(new AppError("User is not found", 404));

  if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: "avatars" },
      );

      job.applicants.push({
        user: req.user.authenticatedUser._id,
        cv: {
          url,
          public_id,
          resource_type: "application/pdf",
        },
        phone,
        phoneCountryCode,
        email
      });

      await job.save();
  }
  

  res.json({ message: "You have applied this job successfully" });
});

const getPostedJob = catchAsync(async (req, res, next) => {
  console.log(req.user.authenticatedUser._id)
  let jobs = await Job.find({ writer: req.user.authenticatedUser._id })
    .populate("company")
    .populate("writer")
    .populate({
      path: "applicants",
      populate: {
        path: "user",
        model: "User",
      },
    })

  res.json({ data: jobs });
});

module.exports = {
  createJob,
  getDetailJob,
  searchJobs,
  applyJob,
  getPostedJob
};
