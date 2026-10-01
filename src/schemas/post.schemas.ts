import z from "zod";


export const PostSchemaCreate=z.object({
    title:z.string().min(5,"title must have at least 5 chatacter"),
    content:z.string().min(10,"atleast 10 characters").optional()
})


export const PostSchemaResponse=z.object({
    id:z.number(),
    author_id:z.number(),
    title:z.string().min(5,"title must have at least 5 chatacter"),
    content:z.string().min(10,"atleast 10 characters").optional(),
    created_at:z.date(),
    updated_at:z.date()
})