import { configureStore } from "@reduxjs/toolkit";
import channel from "./channelSlice";

export default configureStore({
  reducer: {
    channel
  }
});