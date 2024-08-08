import User from "../models/User.js";

// Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      user,
      message: "Retrieved User Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while Retrieving User",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
      message: "Retrieved Users Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while Retrieving Users",
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json({
      success: true,
      formattedFriends,
      message: "Retrieved User's Friends Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while retrieving User's friend",
    });
  }
};

// Update
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Check if the user is trying to add themselves as a friend
    if (id === friendId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself as a friend.",
      });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((fId) => fId !== friendId);
      friend.friends = friend.friends.filter((fId) => fId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((fId) => User.findById(fId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json({
      success: true,
      formattedFriends,
      message: "Friend added or removed successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while adding or removing friend",
    });
  }
};
