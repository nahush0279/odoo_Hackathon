import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { product, getAllProduct, updateProduct, deleteProduct, searchProducts} from "../controllers/product.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/addProduct").post(
    upload.fields([
            {
                name: "image1",
                maxCount: 1
            },  
            {
                name: "image2",
                maxCount: 1
            }, 
            {
                name: "image3",
                maxCount: 1
            }, 
            {
                name: "image4",
                maxCount: 1
            }
        ]),
    product
)

router.route("/updateProduct/:productId").post(
    upload.fields([
            {
                name: "image1",
                maxCount: 1
            },  
            {
                name: "image2",
                maxCount: 1
            }, 
            {
                name: "image3",
                maxCount: 1
            }, 
            {
                name: "image4",
                maxCount: 1
            }
        ]),
    updateProduct
)

router.route("/deleteproduct/:productId").delete(
    deleteProduct
)
    
router.get('/search', searchProducts);

router.route("/getProductList").get(getAllProduct)

export default router