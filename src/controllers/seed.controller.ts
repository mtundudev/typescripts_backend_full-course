import { seedrole } from "../services/seedRole.service.js";
import type { Response,Request } from "express";


export async function roleseed(req:Request,res:Response) {
    const role=await seedrole()
    return res.status(201).json(role)
    
}