const AppError = require("../../api/v1/utils/appError");
const catchAsync = require("../../api/v1/utils/catchAsync");
const Company = require("../models/company.model");

const searchCompany = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next(new AppError("You need a name", 400));

  const companies = await Company.find({
    name: { $regex: name, $options: "i" },
  })
    .limit(30)
    .lean();

  res.status(200).json({ data: companies });
});

const getCompany = catchAsync(async (req, res, next) => {
  const { companyId } = req.params;
  if (!companyId) return next(new AppError("Invalid Id Company", 400));

  const company = await Company.findById(companyId).lean();

  res.status(200).json({ company });
});

module.exports = { searchCompany, getCompany };
