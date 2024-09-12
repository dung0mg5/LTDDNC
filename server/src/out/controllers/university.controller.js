const University = require("../models/university.model");
const AppError = require("../../api/v1/utils/appError");
const catchAsync = require("../../api/v1/utils/catchAsync");

const searchUniversity = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next(new AppError("You need a name", 400));

  const universities = await University.find({
    name: { $regex: name, $options: "i" },
  })
    .limit(30)
    .lean();

  res.status(200).json({ data: universities });
});

const getUniversity = catchAsync(async (req, res, next) => {
  const { universityId } = req.params;
  if (!universityId) return next(new AppError("Invalid Id University", 400));

  const university = await University.findById(universityId).lean();

  res.status(200).json({ university });
});

module.exports = { searchUniversity, getUniversity };
