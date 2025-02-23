import express from "express";
import { searchEntities } from "../controllers/searchController.js";
import validate from '../middleware/validateRequest.js';

const router = express.Router();
router.get("/", validate("search"), searchEntities);

export default router;
