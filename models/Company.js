import mongoose from 'mongoose';
import User from './User.js';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  hierarchyLevel: { type: Number, required: true }
});

companySchema.index({ name: 'text' });
companySchema.index({ parentCompanyId: 1 });

// Update associated users when company name changes
companySchema.post('save', async (doc) => {
  if (doc.isModified('name')) {
    await User.updateMany(
      { companyId: doc._id },
      { $set: { companyName: doc.name } }
    );
  }
});

export default mongoose.model('Company', companySchema);