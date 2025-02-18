import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/user/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user/", authRouter);

app.get("/", async (req, res) => {
    res.json({
        success: true,
    })
})

app.listen(8080, () => console.log("Server is Up and Ruuning on URL : http://localhost:8080"));