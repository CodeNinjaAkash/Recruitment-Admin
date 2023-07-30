import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: "",
    page: 1,
  },
  reducers: {
    user_token: (state, action) => {
      state.value = action.payload;
    },
    user_remove_token: (state) => {
      state.value = "";
    },
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      if (state.page > 0) {
        state.page -= 1;
      }
    },
    pagenum: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { user_token, user_remove_token, pagenum } = counterSlice.actions;

export default counterSlice.reducer;
