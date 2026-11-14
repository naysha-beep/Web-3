// const express=require("express");
// const router=express.Router();
// const {createProduct,getProducts,getProductById,updateProduct,deleteProduct,adjustStock,lowStockProducts,categorySummary} = require("../controllers/productController");
// router.post("/",createProduct);
// router.get("/",getProducts);
// router.get("/low-stock",lowStockProducts);
// router.get("/summary",categorySummary);
// router.get("/:id",getProductById);
// router.put("/:id",updateProduct);
// router.delete("/:id",deleteProduct);
// router.patch("/:id/stock",adjustStock);
// module.exports=router;
const express = require("express");

const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    adjustStock,
    lowStockProducts,
    categorySummary
} = require("../controllers/productController");

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/low-stock", lowStockProducts);

router.get("/summary", categorySummary);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id/stock", adjustStock);

module.exports = router;