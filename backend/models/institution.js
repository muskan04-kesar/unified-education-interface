import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({

  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },  // AISHE code

  type: {
    type: String,
    enum: ["school", "college", "university"],
    default: "school"
  },

  address: String,
  district: String,
  state: String,

  principalName: String,
  contact: String,

  nirfScore: Number,
  accreditation: String,

  infraRatings: {
    classrooms: Number,
    labs: Number,
    library: Number,
    sports: Number
  }

}, { timestamps: true });

institutionSchema.index({ code: 1 }, { unique: true });

export default mongoose.model("Institution", institutionSchema);
