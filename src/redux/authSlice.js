import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name : "auth",
  initialState:{
    users:[],
    user:(null),
    isAuthenticated:(false)
  },
  
  reducers: {
    
    registerUser:(state , action)=>{
        state.users.push(action.payload);
    },

  loginUser: (state, action) => {
  const { emailAddress, password } = action.payload;

  const foundUser = state.users.find(
    (value) =>
      value.emailAddress.trim().toLowerCase() ===
        emailAddress.trim().toLowerCase() &&
      value.password === password
  );

  console.log(
    "Registered email:",
    state.users.map((user) => user.emailAddress)
  );

  console.log("User found:", Boolean(foundUser));

  if (foundUser) {
    state.user = foundUser;
    state.isAuthenticated = true;
  } else {
    state.user = null;
    state.isAuthenticated = false;
  }
},
logoutUser:(state,action)=>{
   state.user = null
   state.isAuthenticated = false;
}
  }

})

export const {registerUser,loginUser,logoutUser}= authSlice.actions;
export default authSlice.reducer;