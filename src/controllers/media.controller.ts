import type { Response,Request } from "express";
import { deletepostimage, showimagepost, uploadsimage } from "../services/media.service.js";
import { AppError } from "../middleware/error.js";

export async function upload_post(req:Request,res:Response) {
    if(!req.file){
        throw new AppError("the file is required",403)
    }
    const media=await uploadsimage(req.file,Number(req.params.id),Number(req.userId));
    return res.status(200).json(media)
    
}

export async function post_image(req:Request,res:Response) {
    const image=await showimagepost(Number(req.params.id))
    return res.status(200).json(image)
    
}

export async function delete_omage(req:Request,res:Response) {
    const post=await deletepostimage(Number(req.params.id))
    return res.status(200).json(post)
    
}