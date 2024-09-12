/* eslint-disable no-shadow */
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("../utils/appError");

const uploadFile = (req, res, next) => {
  const folderDestination = path.join(__dirname, "../../assets");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(folderDestination)) {
        fs.mkdirSync(folderDestination, { recursive: true });
      }
      cb(null, folderDestination);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()} - ${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype.startsWith("application/pdf")
    ) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Not an image or video! Please upload image or video",
          400,
        ),
        false,
      );
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
    fileFilter,
  });

  upload.any()(req, res, (err) => {
    if (err) return next(new AppError(err.message, 500));

    if (!req.files || req.files.length === 0) {
      return next();
    }

    const file = req.files[0];
    const fileUrl = `${req.protocol}://${req.get("host")}/assets/userFiles/${
      file.filename
    }`;

    req.file = file;
    req.fileUrl = fileUrl;
    req.fileType = file.mimetype.split("/")[0];

    next();
  });
};

module.exports = { uploadFile };
