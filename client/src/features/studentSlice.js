import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: "",
  },
  reducers: {
    studentinfo: (state, action) => {


      state.student = action.payload;
    },
  },
});

export const { studentinfo } = studentSlice.actions;
export const selectStudent = (state) => state.student.student;

export default studentSlice.reducer;
