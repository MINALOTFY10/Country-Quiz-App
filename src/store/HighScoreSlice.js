import { createSlice } from "@reduxjs/toolkit";

const initialHighScoreState = {
  userName: null,
  highScores: [],
};

const HighScoreSlice = createSlice({
  name: "highscore",
  initialState: initialHighScoreState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setHighScoreData(state, action) {
      state.highScores = action.payload;
    },
  },
});

export default HighScoreSlice;
