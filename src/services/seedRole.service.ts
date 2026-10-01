import prisma from "../config/database.js"

const roles=[
    {name:"editor"},
    {name:"member"},
    {name:"admin"},
]

export async function seedrole() {
    for (const data of roles){
        const Role=await prisma.role.upsert({
            where:{name:data.name},
            update:{},
            create:{name:data.name}
        })
    }
    return {
        "message":"role seeded successfuly"
    }

}
  

