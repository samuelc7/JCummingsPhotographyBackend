const { Schema, model } = require("mongoose");

const userShema = new Schema({
    identifier: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    fistName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String }
})

model.exports = model("User", userShema);
