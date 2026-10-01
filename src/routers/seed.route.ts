
import Express from "express";
import { roleseed } from "../controllers/seed.controller.js";
import { de } from "zod/locales";


const router=Express.Router()


router.post("/seed",roleseed)


export default router