import z from "zod";

export const UserSchemaCreate=z.object({
    name:z.string().min(2).max(50,"the name is too long"),
    password:z.string(),
    email:z.email()
})

export const userUpdateSchema=z.object({
    name:z.string().optional(),
    email:z.email().optional(),
    password:z.string().optional()

})

export const UserResponseSchema=z.object({
    id:z.number(),
    name:z.string(),
    email:z.email(),
    created_at:z.date(),
    updated_at:z.date()


})