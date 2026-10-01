import z from "zod"


export const Loginschema=z.object({
    email:z.string(),
    password:z.string()
})