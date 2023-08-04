const mongoose = require("mongoose");
const userModel = require("./userModel");

const postModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    Poststatus: {
      type: String,
      enum: ["active", "inactive"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true }
);
postModel.index({ location: "2dsphere" });
module.exports = mongoose.model("Post", postModel);
