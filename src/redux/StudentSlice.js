import { createSlice } from "@reduxjs/toolkit";
import { studentLists } from "./StudentLists";
const StudentSlice = createSlice({
  name : "student",
  initialState : studentLists,
  reducers : {}
})
export const Actions = StudentSlice.actions;
export default StudentSlice.reducer;

