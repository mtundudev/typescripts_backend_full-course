import Express from "express";
import { usercreate,allUser,UserUpdate,showsingle,UserDelete, getme} from "../controllers/user.controller.js";
import { user_login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";


const router=Express.Router();


router.post("/user",usercreate);

router.post("/login",user_login)

router.get("/users",authenticate,allUser)

router.get("/user/me",authenticate,getme)

router.get("/user/:id",authenticate,showsingle)

router.put("/user/:id",authenticate,UserUpdate)

router.delete("/user/:id",authenticate,UserDelete)


export default router;
