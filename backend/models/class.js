import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },

  className: {
    type: String,
    required: true
  },

  section: {
    type: String,
    default: "A"
  },

  classTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  subjects: {
    type: [String],
    default: []
  }
}, { timestamps: true });

classSchema.index({ instituteId: 1 });

export default mongoose.model("Class", classSchema);
