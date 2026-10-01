import { UserSchemaCreate,userUpdateSchema } from "../schemas/user.js";
import z from "zod";
import prisma from "../config/database.js";
import { AppError } from "../middleware/error.js";
import bcrypt from "bcryptjs";

type userCreate=z.infer<typeof UserSchemaCreate>;
export async function create(data:userCreate) {
    const existing= await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    if (existing){
        throw new Error("email alredy used")
    }
    const user=await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:await bcrypt.hash(data.password,10),
        }
    })
    return user
}

export async function showall() {
    const user= await prisma.user.findMany()
    return user  
}

export async function singleuser(id:number) {
    const user = await prisma.user.findUnique({
        where:{
            id:id
        },
    });
    if (!user){
        throw new AppError(`user with id ${id} not found`,404 )
    }
    return user

}
type userupdate=z.infer<typeof userUpdateSchema>;
export async function userUpdate(data:userupdate,id:number) {
    const userexist = await prisma.user.findUnique({
        where:{
            id:id
        },
    });
    if (!userexist){
        throw new AppError(`user with id ${id} not found`,403 )
    }
    const update= {...data};
    if (update.password){
        const hashed =await bcrypt.hash(update.password,10)
        update.password=hashed
    }
    
    const user=await prisma.user.update({
        where:{
            id:id
        },
        data:update,   
    });
    return user
}


export async function deleteuser(id:number) {
    const userexist = await prisma.user.findUnique({
        where:{
            id:id
        },
    });
    if (!userexist){
        throw new AppError(`user with id ${id} not found` ,404)
    }
    const user=await prisma.user.delete({
        where:{
            id:id
        },
    });

    return {
        "message":"user deleted succesfuly"
    }
}
