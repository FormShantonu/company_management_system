import express from "express";
import {
  createCompany,
  getCompanyDetails,
} from "../controllers/companyController.js";
import validate from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", validate("createUser"), createCompany);
router.get("/:companyId", validate("getCompany"), getCompanyDetails);

export default router;
