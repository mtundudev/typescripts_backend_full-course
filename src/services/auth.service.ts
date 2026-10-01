import prisma from "../config/database.js";
import { AppError } from "../middleware/error.js";
import bcrypt from "bcryptjs";
import { create_access_token } from "../config/security.js";



export async function login_user(email:string,password:string) {
    const user=await prisma.user.findUnique({
        where:{
            email:email
        },
    });
    if (!user){
        throw new AppError("wrong email ",401)
    }
    const validpassword=await bcrypt.compare(password,user.password)
    if (!validpassword){
        throw new AppError("wrong password",401)
    }
    const token=await create_access_token({sub:user.id})
    return {
        "access_token":token,
        "token_type":"Bearer"
    }
}

