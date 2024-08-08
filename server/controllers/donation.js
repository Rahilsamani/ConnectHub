import Donation from "../models/Donation.js";

// Create Donation Post
export const createDonationPost = async (req, res, uniqueID) => {
  try {
    let { name, description, price, picture } = req.body;

    if (!name || !description || !price || !picture) {
      res.status(404).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    picture = `${uniqueID} - ${picture}`;

    const newDonationPost = new Donation({
      name,
      description,
      price,
      picturePath: picture,
    });

    const savedDonationPost = await newDonationPost.save();

    res.status(201).json({
      success: true,
      savedDonationPost,
      message: "Donation Post Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating new donation post",
      error: err.message,
    });
  }
};

// get all the donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();

    res.status(201).json({
      success: true,
      donations,
      message: "Fetched all the donations successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting all the donation post",
      error: err.message,
    });
  }
};

// get donation post details
export const getDonationPostDetails = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation Post Not Found",
      });
    }

    res.status(201).json({
      success: true,
      donation,
      message: "Fetched Donation post details successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the donation post",
      error: err.message,
    });
  }
};

// Update Product   --> Admin
export const updateDonationPost = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation Post Not found",
      });
    }

    const newDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      newDonation,
      message: "Donation Post updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the donation post",
      error: err.message,
    });
  }
};

// Delete Donation Page
export const deleteDonationPage = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Delete the donation post",
      });
    }

    await donation.remove();

    res.status(200).json({
      success: true,
      message: "Donation post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the donation post",
      error: err.message,
    });
  }
};
