const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Please provide the amount"],
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: [
      true,
      "Please provide the type of amount whether its income or expense",
    ],
  },

  category: {
    type: String,
    enum: [
      "salary",
      "business",
      "investment",
      "food",
      "travel",
      "shopping",
      "other",
    ],
    required: [true, "category is required"],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  note: {
    type: String,
    trim: true,
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A record must belong to user"],
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
