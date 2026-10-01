import { post_image, upload_post,delete_omage } from "../controllers/media.controller.js";
import Express from "express";
import { upload } from "../middleware/uploads.js";
import { authenticate } from "../middleware/auth.js";


const router=Express.Router()


router.post("/file/:id",authenticate,upload.single("file"),upload_post)

router.get("/file/:id",post_image)

router.delete("/file/:id",delete_omage)



export default router