import express from "express";
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
 


const app = express();
dotenv.config({});
const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
})

app.use("/api/v1/user", userRoute); 
app.use("/api/v1/course", courseRoute); 


