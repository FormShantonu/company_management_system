import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import companyRoutes from "./routes/companies.js";
import userRoutes from './routes/user.routes.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use routes
app.use("/companies", companyRoutes);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
