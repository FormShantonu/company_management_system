import User from "../models/User.js";
import Company from "../models/Company.js";

export const searchEntities = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const users = await User.find({
      $or: [
        { name: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    }).populate({
      path: "company",
      select: 'name parentCompanyId',
      populate: { path: 'parentCompanyId', select: 'name' }
    }).select('name email role');

    const companies = await Company.find({ name: new RegExp(query, 'i') }).populate('parentCompanyId', 'name');

    res.json({ users, companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
