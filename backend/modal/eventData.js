const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    id: { type: Number, required: true, trim: true },
    event_name: { type: String, required: true, trim: true },
    event_category: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("categories", eventsSchema);