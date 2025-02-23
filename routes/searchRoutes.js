import express from "express";
import { searchHandler } from "../controllers/searchController.js";
import validate from '../middleware/validateRequest.js';

const router = express.Router();
router.get("/", validate("search"), searchHandler);

export default router;
