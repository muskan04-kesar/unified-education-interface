import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },

  address: { type: String },
  district: { type: String },
  state: { type: String },

  principalName: { type: String },
  contact: { type: String }
}, { timestamps: true });

institutionSchema.index({ code: 1 }, { unique: true });

export default mongoose.model("Institution", institutionSchema);
