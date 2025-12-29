const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    specialization: {
      type: String,
      required: true
    },

    photo: {
      type: String // image URL
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
