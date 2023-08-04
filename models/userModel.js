const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("User", userModel);
