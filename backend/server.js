import express from "express";
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";


dotenv.config();

mongoose.connect(process.env.MONGODB_PATH, () => {
    console.log('Connected to MongoDB');
}, (e) => console.log(e));

const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors({
    origin: origin,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);
app.use("/api/v1", userRoutes); // Use the CommonJS imported userRoutes

app.listen(PORT, () => {
    console.log(`Your app is running at http://localhost:${PORT}`);
});
