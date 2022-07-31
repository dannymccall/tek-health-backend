const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
