import router from "express";
import { SortProducts } from "../controllers/product.controller.js";
import { paginateProducts } from "../controllers/product.controller.js";
import { searchProducts } from "../controllers/product.controller.js";
import { AllProducts } from "../controllers/product.controller.js";
import { SingleProduct } from "../controllers/product.controller.js";
const ProductRouter = router();

ProductRouter.get('/sort', SortProducts)
ProductRouter.get('/paginate', paginateProducts)
ProductRouter.get('/search', searchProducts)
ProductRouter.get('/all-products', AllProducts)
ProductRouter.get('/single-product/:id', SingleProduct)
export default ProductRouter
