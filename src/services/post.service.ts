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
export async function allpost(page:number=1,limit:number=10) {
    
    page=Math.max(1,page)
    limit=Math.min(Math.max(1,limit),100)
    const skip=(page-1)*limit

    const [posts,total]=await prisma.$transaction([
        prisma.post.findMany({
            skip,
            take:limit,
            orderBy:{
                id:"asc",
            },
        }),
        prisma.post.count(),
    ]);
    const totalpages=Math.ceil(total/limit);
    return{
        posts:posts,
        pagination:{
            page,
            limit,
            total,
            totalpages,
            hasNestpages:page<totalpages,
            hasPreviouspage:page>1
        }
    }
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
