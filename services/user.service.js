import User from '../models/User.js';
import Company from '../models/Company.js';
import mongoose from 'mongoose';

export const createUser = async (userData) => {
  // Verify company exists
  const { name, email, companyId } = userData;
  const company = await Company.findById(companyId);
  if (!company) throw new Error('Company not found');

  const existingUser = await User.findOne({email});
    if (existingUser) {
      throw new Error('Email already exists. Please use a different email.');
    }

  return User.create({
    ...userData,
    companyName: company.name
  });
};

export const getUserDetails = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  return User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'companyDetails',
        pipeline: [
          {
            $project: {
              name: 1,
              hierarchyLevel: 1,
              parentCompany: 1
            }
          }
        ]
      }
    },
    { $unwind: '$companyDetails' },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        company: 1,
        companyName: 1,
        companyDetails: 1
      }
    }
  ]);
};