import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "./StudentSlice";
import authSlice from "./authSlice"

const store = configureStore({
  reducer:{ 
    StudentStore:StudentSlice,
    authStore:authSlice,

  },

})
export default store;