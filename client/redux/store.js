import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";

export default configureStore({
  reducer: {
    user: userReducer, //reducer name : user is used in login when selector is initalized
  },
});

// HOST
export const server = "http://10.5.114.52:8080/api/v1";

