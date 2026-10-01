import Jwt from "jsonwebtoken";
import "dotenv/config";


const JWT_SECRET=process.env.JWT_SECRET as string;

export async function create_access_token(data:object) {
    const to_encoode={...data}
    const token=Jwt.sign(to_encoode,JWT_SECRET,{
        expiresIn:"1h",algorithm:"HS256",
        
    });
    return token  
}

export async function decode_token(token:string) {
    try{
        const payload=Jwt.verify(token,JWT_SECRET);
        return payload;
    }catch{
        return{
            "message":"invalid or expired token"
        }
    }
    
}