import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  donationPosts: [],
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        const friends = action.payload.friends;

        // Check if the user is trying to add themselves as a friend
        if (!friends.includes(state.user.id)) {
          state.user.friends = friends;
        } else {
          console.error("User cannot add themselves as a friend.");
        }
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      let shuffledPosts = [];

      if (action.payload.profile) {
        shuffledPosts = action.payload.posts;
      } else if (action.payload.posts.post) {
        shuffledPosts = shuffleArray(action.payload.posts.post);
      } else {
        shuffledPosts = shuffleArray(action.payload.posts);
      }

      state.posts = shuffledPosts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post.updatedPost._id) {
          return { ...action.payload.post.updatedPost, key: post._id };
        }
        return { ...post, key: post._id };
      });

      return {
        ...state,
        posts: updatedPosts,
      };
    },
    setDonationPosts: (state, action) => {
      state.donationPosts = action.payload;
    },
    setUpdateDonationPost: (state, action) => {
      const updatedDonationPosts = state.donationPosts.map((post) => {
        if (post._id === action.payload.updatedDonationPost._id) {
          return { ...action.payload.updatedDonationPost, key: post._id };
        }
        return { ...post, key: post._id };
      });

      return {
        ...state,
        donationPosts: updatedDonationPosts,
      };
    },
    setUser: (state, action) => {
      state.donationPosts = action.payload;
    },
    deletePost: (state, action) => {
      const updatedPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );

      return {
        ...state,
        posts: updatedPosts,
      };
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setDonationPosts,
  setUpdateDonationPost,
  deletePost,
} = authSlice.actions;
export default authSlice.reducer;
