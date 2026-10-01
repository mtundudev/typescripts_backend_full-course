import type { Response,Request,NextFunction } from "express";
import { AppError } from "./error.js";
import { decode_token } from "../config/security.js";
declare global{
    namespace Express{
        interface Request{
            userId?:number;
        }
    }
}

export async function authenticate(req:Request,res:Response,next:NextFunction) {
    const Header=req.headers.authorization;
    if (!Header || !Header.startsWith("Bearer ")){
        throw new AppError("missing or invalid authorization header",401)
    }
    const token= Header.slice(7).trim();
    const payload=await decode_token(token);
    if (typeof payload==="string"|| !("sub" in payload)){
        throw new AppError("invalid or expire token",401)
    }
    req.userId=Number(payload.sub);
    next()
    
}