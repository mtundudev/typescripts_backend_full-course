import { ZodError } from "zod"
import type { Response,Request,NextFunction } from "express"


export class AppError extends Error{
    constructor(message:string,public status:number){
        super(message)
    }
}

export function errorHandler(
    err:unknown,
    req:Request,
    res:Response,
    next:NextFunction
){
    if (err instanceof ZodError ){
        return res.status(400).json({errors:err.issues});
    }
    if (err instanceof AppError){
        return res.status(err.status).json({message:err.message});
    }
    console.error(err);
    return res.status(500).json({message:"internal server error"});
}