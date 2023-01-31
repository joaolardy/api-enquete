import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running in port ${port}`));