const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),   
  limits: {
    fileSize: 10 * 1024 * 1024,      //10MB
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
