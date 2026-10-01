import fs from "fs"
import path, { extname } from "path";
import crypto from "node:crypto"
import multer from "multer";


const uploadDir=path.join(process.cwd(),"src","uploads");
fs.mkdirSync(uploadDir,{recursive:true})
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadDir)
    },
    filename:function(req,file,cb){
        const extension=extname(file.originalname)
        const filename=`post_${crypto.randomUUID()}_${extension}`;
        cb(null,filename)
    },
});
export const upload=multer({
    storage:storage
});
