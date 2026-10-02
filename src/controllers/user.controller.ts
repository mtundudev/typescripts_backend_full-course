import {create,showall,singleuser,userUpdate,deleteuser} from "../services/user.service.js";
import type { Response,Request } from "express";
import { UserSchemaCreate,UserResponseSchema, PaginationResponse } from "../schemas/user.js";
import z from "zod";

export async function usercreate(req:Request,res:Response) {
    const data=UserSchemaCreate.parse(req.body);
    const user=await create(data);
    const response=UserResponseSchema.parse(user)
    
    return res.status(201).json(response);
    
}

export async function allUser(req:Request,res:Response) {
    const  user=await showall(Number(req.query.page),Number(req.query.limit))
    const response=PaginationResponse.parse(user);
    return res.status(201).json(response)
    
}
export async function getme(req:Request,res:Response) {
    const user=await singleuser(Number(req.userId))
    const response= UserResponseSchema.parse(user)
    res.status(200).json(response)
    
}
export async function showsingle(req:Request,res:Response) {
    const user= await singleuser(Number(req.params.id));
    const response= UserResponseSchema.parse(user);
    return res.status(200).json(response)
    
}

export async function UserUpdate(req:Request,res:Response) {
    const user=await userUpdate(req.body,Number(req.params.id));
    const response= UserResponseSchema.parse(user);
    return res.status(200).json(response)
    
}

export async function UserDelete(req:Request,res:Response) {
    const user=await deleteuser(Number(req.params.id));
    res.status(200).json(user)
    
}