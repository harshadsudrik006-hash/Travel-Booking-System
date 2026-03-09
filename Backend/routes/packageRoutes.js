const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
createPackage,
getAllPackages,
updatePackage,
deletePackage,
getPackageById
} = require("../controllers/packageController");

const { protect, admin } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({

destination:"uploads/",

filename:(req,file,cb)=>{

cb(null,Date.now()+"-"+file.originalname)

}

})

const upload = multer({storage})

router.get("/",getAllPackages)

router.get("/:id",getPackageById)

router.post("/",protect,admin,upload.single("image"),createPackage)

router.put("/:id",protect,admin,upload.single("image"),updatePackage)

router.delete("/:id",protect,admin,deletePackage)

module.exports = router