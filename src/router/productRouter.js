import productController from "../controller/productController.js";

let productRouter = {
    '/products': productController.showAll,
    '/add-product': productController.showFormAdd,
    '/edit-product': productController.edit,
    '/delete': productController.delete,
}

export default productRouter;