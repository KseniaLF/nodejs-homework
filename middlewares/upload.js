const multer = require("multer");
const path = require("path");

// const { HttpError } = require("../helpers");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniqueSuffix}_${file.originalname}`;

    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  console.log(file);

  // const { mimetype } = file;
  // if (mimetype !== "image/png") {
  //   console.log(123);
  //   cb(new HttpError(400, "only image/png"), false);
  // }

  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
