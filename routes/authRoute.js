import express from "express"
import {registerControllers,loginController,testController,forgotpasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controllers/authController.js"
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"
//router object
const router =express.Router()

// routing
// register || method post
router.post('/register',registerControllers)
export default router


// Login || method post
router.post('/login',loginController)

// forgot password || post
router.post('/forgotpassword',forgotpasswordController)

// test routes
router.get("/test",requireSignIn,isAdmin,testController)

// protected user route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    
    res.status(200).send({data:{ok:true}})
})

// protected admin route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    console.log("ye chal rahai ")
    res.status(200).send({data:{ok:true}})

})

//update profile
router.put("/profile", requireSignIn, updateProfileController);


//all orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);