import { PostSchemaCreate } from "../schemas/post.schemas.js";
import z from "zod";
import prisma from "../config/database.js";
import { AppError } from "../middleware/error.js";


type postschemacreate=z.infer<typeof PostSchemaCreate>
export async function createpost(data:postschemacreate,id:number) {

    const post= await prisma.post.create({
        data:{
            title:data.title,
            content:data.content,
            author_id:id,
            
        },
    });
    return post
    
}
export async function allpost() {
    const post=await prisma.post.findMany()
    return post
    
}

export async function showpost(id:number) {
    const post=await prisma.post.findUnique({
        where:{
            id:id
        },
    });
    if(!post){
        throw new AppError(`post with id of ${id} not found`,404)
    }
    return post    
}


export async function updatedpost(data:postschemacreate,id:number,author_id:number) {
    const exist = await prisma.post.findUnique({
        where:{
            id:id
        },
    });
    if (!exist){
        throw new AppError(`post with id  ${id} not found`,404)
    }
    const owner=await prisma.post.findFirst({
        where:{
            author_id:author_id
        },
    });
    if(!owner){
        throw new AppError("you not have action to perfom this action",401)
    }

    const post =await prisma.post.update({
        where:{
            id:id,
        },data:{
            title:data.title,
            content:data.content
        },
    })
    return post    
}
export async function myposts(author_id:number) {
    const post=prisma.post.findMany({
        where:{
            author_id:author_id
        }
    });
    return post
    
}
export async function deletepost(id:number,author_id:number) {
    const exist=await prisma.post.findUnique({
        where:{
            id:id
        },
    });
    if (!exist){
        throw new AppError(`the post with id  ${id} not found`,404)
    }
    const isOuthor=await prisma.post.findFirst({
        where:{
            author_id:author_id
        },
    });    
    if(! isOuthor){
        throw new AppError("you not have access to perform this action",403)
    }
    const post=await prisma.post.delete({
        where:{
            id:id
        }
    });
    return{
        "message":"post deleted successfuly"
    }
    
}
