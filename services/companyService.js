import Company from "../models/Company.js";
import mongoose from "mongoose";

export const getCompanyDetail = async (companyId) => {
  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    throw new Error("Invalid company ID");
  }

  return Company.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(companyId) } },
    {
      $lookup: {
        from: "users",
        let: { companyId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$company", "$$companyId"] } } },
          { $project: { name: 1, email: 1, role: 1 } },
        ],
        as: "users",
      },
    },
    {
      $lookup: {
        from: "companies",
        localField: "_id",
        foreignField: "parentCompany",
        as: "subCompanies",
        pipeline: [{ $project: { name: 1, hierarchyLevel: 1 } }],
      },
    },
  ]);
};
