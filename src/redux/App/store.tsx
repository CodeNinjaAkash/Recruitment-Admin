import { configureStore } from "@reduxjs/toolkit";
import reducers from "../features/counter/CounterSlice";

export default configureStore({
  reducer: { counter: reducers },
});
