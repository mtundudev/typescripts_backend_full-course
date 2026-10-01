import app from "./app.js";

const PORT=3000

app.listen(PORT,()=>{
    try{
        console.log(`app running in http://localhost:${PORT} `)
    }catch(error){
        console.log(console.error)
    };
})