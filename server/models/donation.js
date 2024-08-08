import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of the donation Post"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of the donation Post"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of the donation Post"],
  },
  picturePath: {
    type: String,
    default: "",
  },
  amountGained: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
