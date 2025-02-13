import express from 'express';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

app.get("/", (req, res)=>{
    res.json({
        success : true,
    })
})

app.listen(8080, () => console.log("Server is Up and Ruuning on URL : http://localhost:8080"));