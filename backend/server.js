import express from "express";
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import https from "https";


dotenv.config();

mongoose.connect(process.env.MONGODB_PATH, () => {
    console.log('Connected to MongoDB');
}, (e) => console.log(e));

const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 const serverURL = "https://taskmanager-bhx4.onrender.com"; // Ensure this uses the correct protocol (http or https)

    setInterval(() => {
      https.get(serverURL, (res) => { // Change to https.get if using HTTP
        console.log(`Server pinged: ${res.statusCode}`);
      }).on("error", (err) => {
        console.error("Error pinging the server:", err.message);
      });
    }, 6000);

app.use(api);
app.use("/api/v1", userRoutes); // Use the CommonJS imported userRoutes

app.listen(PORT, () => {
    console.log(`Your app is running at http://localhost:${PORT}`);
});
