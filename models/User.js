import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company ID is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for search optimization
userSchema.index({ name: "text", email: "text", companyName: "text" });
userSchema.index({ companyId: 1 });

const User = mongoose.model("User", userSchema);

export default User;
