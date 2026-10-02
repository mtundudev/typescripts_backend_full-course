import type { Response,Request } from "express";
import { PostSchemaCreate,PostSchemaResponse } from "../schemas/post.schemas.js";
import { createpost,allpost,showpost,deletepost,updatedpost, myposts } from "../services/post.service.js";
import { AppError } from "../middleware/error.js";
import z from "zod";


export async function create_post(req:Request,res:Response) {
    if (!req.userId){
        throw new AppError("unaouthorized",401)
    }
    const data=PostSchemaCreate.parse(req.body)
    const post =await createpost(data,req.userId)
    const response=PostSchemaResponse.parse(post)
    return res.status(201).json(response)
    
}

export async function all_post(req:Request,res:Response) {
    const post=await allpost(Number(req.query.page),Number(req.query.limit) )
    return res.status(200).json(post)
}
export async function my_posts(req:Request,res:Response) {
    const posts=await myposts(Number(req.userId));
    const response=z.array(PostSchemaResponse).parse(posts)
    return res.status(200).json(response)
    
}

export async function show_post(req:Request,res:Response) {
    const post= await showpost(Number(req.params.id))
    const response=PostSchemaResponse.parse(post);
    return res.status(200).json(response)
    
}

export async function update_post(req:Request,res:Response) {
    const data= PostSchemaCreate.parse(req.body);
    const post= await updatedpost(data,Number(req.params.id),Number(req.userId));
    const  response= PostSchemaResponse.parse(post);
    return res.status(200).json(response)
    
}

export async function delete_post(req:Request,res:Response) {
    const post =await deletepost(Number(req.params.id),Number(req.userId))
    return res.status(200).json(post)

}