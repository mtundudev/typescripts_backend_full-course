import { create_post,show_post,all_post,update_post,delete_post, my_posts } from "../controllers/post.controller.js";
import Express  from "express";
import { authenticate } from "../middleware/auth.js";

const router=Express.Router();

router.post("/post",authenticate,create_post);

router.get("/post",all_post)

router.get("/post/me",authenticate,my_posts)

router.get("/post/:id",authenticate,show_post)

router.put("/post/:id",authenticate,update_post)

router.delete("/post/:id",authenticate,delete_post)


export default router