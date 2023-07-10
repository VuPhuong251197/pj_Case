import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";

let router = {
    '/': homeController.showIndex,
    '/err': homeController.showErr,
    '/login': homeController.showLogin
}
router = {...router, ...productRouter};
router = {...router, ...userRouter};
export default router;