import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";
import { createServer } from "http";
import shipmentRoutes from "./routes/shipments"
dotenv.config();


const port = process.env.PORT || 5000 ;

const app = express();

const httpServer = createServer(app);

app.use(cors({
  credentials:true,
  origin:true
}));
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(cookieParser());







app.use("/api", shipmentRoutes);

app.use(notFoundHandler);

app.use(errorHandler);  

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log("Database connected successfully");
}).then(()=>{
  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.log(err);
  
})



export default app;
