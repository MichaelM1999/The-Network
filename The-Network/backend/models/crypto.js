const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
  crypto_name: { type: String, required: true },
  notes: { type: String, required: false },
  admin: {type: String, required: true},
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;