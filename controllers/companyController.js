import Company from "../models/Company.js";
import { getCompanyDetail } from "../services/companyService.js";

export const createCompany = async (req, res) => {
  try {
    const { name, parentCompanyId } = req.body;

    let hierarchyLevel = 1;
    if (parentCompanyId) {
      const parentCompany = await Company.findById(parentCompanyId);
      if (!parentCompany)
        return res.status(400).json({ error: "Parent company not found" });
      hierarchyLevel = parentCompany.hierarchyLevel + 1;
    }

    const company = new Company({ name, parentCompanyId, hierarchyLevel });
    await company.save();

    res.status(201).json({ companyId: company._id, hierarchyLevel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyDetails = async (req, res) => {
  try {
    const result = await getCompanyDetail(req.params.companyId);

    if (!result.length) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
