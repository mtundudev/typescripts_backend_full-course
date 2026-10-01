import  Express from "express"
import userrouter from "./routers/user.route.js"
import postrouter from "./routers/post.route.js"
import routerfile from "./routers/media.route.js"
import { errorHandler } from "./middleware/error.js"
import seedrouter from "./routers/seed.route.js"

const app=Express()

app.use(Express.json())
app.use(userrouter)
app.use(postrouter)
app.use(routerfile)
app.use(seedrouter)
app.use(errorHandler)


app.get("/",(req,res)=>{
    res.json({
        "message":"welcome to my typescripts course"
    });
})

export default app;
