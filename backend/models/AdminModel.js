const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
