import type { Request,Response } from "express";
import { login_user } from "../services/auth.service.js";
import { Loginschema } from "../schemas/login.user.js";

export async function user_login(req:Request,res:Response) {
    const data= Loginschema.parse(req.body);
    const user=await login_user(data.email,data.password)
    res.status(200).json(user)
}