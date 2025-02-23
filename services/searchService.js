import User from '../models/User.js';
import Company from '../models/Company.js';

export const searchEntities = async (query) => {
  const users = await User.aggregate([
    {
      $match: {
        $or: [
          { name: new RegExp(query, 'i') },
          { email: new RegExp(query, 'i') }
        ]
      }
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'companyId',
        foreignField: '_id',
        as: 'companyDetails'
      }
    },
    { $unwind: '$companyDetails' },
    {
      $lookup: {
        from: 'companies',
        localField: 'companyDetails.parentCompanyId',
        foreignField: '_id',
        as: 'parentCompanyDetails'
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        companyName: '$companyDetails.name',
        parentCompanyName: { $arrayElemAt: ['$parentCompanyDetails.name', 0] }
      }
    }
  ]);

  const companies = await Company.find({ name: new RegExp(query, 'i') }).populate('parentCompanyId', 'name');

  return { users, companies };
};
