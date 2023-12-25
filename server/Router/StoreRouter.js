const Router = require("express").Router();
const multer = require("multer");

const {
  add,
  getMyProducts,
  getProduct,
  deleteProduct,
  home,
  allProducts,
  searchRes,
} = require("../Controllers/Store");
const { Verify } = require("../Middleware/VerifyToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

Router.route("/add").post(Verify, upload.single("image"), add);
Router.route("/getproducts").get(Verify, getMyProducts);
Router.route("/getproducts/:id").get(Verify, getProduct);
Router.route("/getHomeProducts").get(home);
Router.route("/del/:id").get(deleteProduct);
Router.route("/all").get(allProducts);
Router.route("/search/:query").get(searchRes);

module.exports = Router;
