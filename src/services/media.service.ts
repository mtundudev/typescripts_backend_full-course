import prisma from "../config/database.js";
import { AppError } from "../middleware/error.js";



export async function uploadsimage(file:Express.Multer.File,post_id:number,author_id:number) {
    const existpost= await prisma.post.findUnique({
        where:{
            id:post_id
        },
    });
    if (!existpost){
        throw new AppError(`post with id ${post_id} not found`,404)
    }
    const media_exist=await prisma.media.findFirst({
        where:{
            post_id:post_id
        },
    })
    let mediapost;
    if (media_exist){
        mediapost= await prisma.media.update({
            where:{
                id:media_exist.id
            },
            data:{
                filename:file.originalname,
                newfilename:file.filename,
                path:file.path,
                mime_type:file.mimetype,
                size:file.size
            },
            
        });
    }else{
        mediapost=await prisma.media.create({
            data:{
                filename:file.originalname,
                post_id:post_id,
                uploaded_by:author_id,
                newfilename:file.filename,
                path:file.path,
                mime_type:file.mimetype,
                size:file.size
            },
        });
    }
    const post=await prisma.post.update({
        where:{
            id:post_id
        },
        data:{
            image_id:mediapost.id,
        }
    })

    return mediapost
}


export async function showimagepost(post_id:number) {
    const post=await prisma.post.findUnique({
        where:{
            id:post_id
        },
    });
    if (!post){
        throw new AppError(`post with id ${post_id} not found`,404)
    }
    if(!post.image_id){
        throw new AppError("the post has no image",403)
    }
    const image=await prisma.media.findUnique({
        where:{
            id:post.image_id,
        }
    });
    return image    
}

export async function deletepostimage(post_id:number) {
    const post=await prisma.post.findUnique({
        where:{
            id:post_id
        },
    });
    if (!post){
        throw new AppError(`post with id ${post_id} not found`,404)
    }
    if(!post.image_id){
        throw new AppError("the post has no image",403)
    }
    const image=await prisma.media.delete({
        where:{
            id:post.image_id,
        }
    });
    const iimage_id=await prisma.post.update({
        where:{
            id:post_id
        },
        data:{
            image_id:null
        }
    });
    
    return {
        "message":"post deleted successfuly"
    }
    
}
