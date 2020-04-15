// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         let val = file.originalname
//         let val1 = val.split(".")
//         cb(null, file.fieldname + "." + val1[1])
//     }
// })

// let upload = multer({
//     storage: storage,
//     fileFilter: (re, file, cb) => {
//         if (file.mimetype.match(/jpeg|jpg|png$i/)) {
//             cb(new Error("file type is not supported"), true)
//         }
//         cb(null, true)
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     }
// })
// module.exports = upload