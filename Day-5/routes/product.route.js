import router from "express";
import { SortProducts } from "../controllers/product.controller.js";
import { paginateProducts } from "../controllers/product.controller.js";
import { searchProducts } from "../controllers/product.controller.js";
const ProductRouter = router();

ProductRouter.get('/sort', SortProducts)
ProductRouter.get('/paginate', paginateProducts)
ProductRouter.get('/search', searchProducts)
export default ProductRouter
