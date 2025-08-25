// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { retry } from "@reduxjs/toolkit/query";


// export const loginCheck = createAsyncThunk("login-check", async (payload) => {
//     const responce = await fetch("https://api.thailash.com/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//     });
//     const data = responce.json();
//     return data;
// })



// const loginSlice = createSlice({
//     initialState: {
//         isLoading: false,
//         message: null,


//     },
//     name: "login",
//     extraReducers: (builder) => {
//         builder.addCase(loginCheck.fulfilled, (state, action) => {

//             state.isLoading = false
//             state.message = " you login is successfully "
//         })
//         builder.addCase(loginCheck.pending, (state, action) => {
//             state.isLoading = true
//             state.message = " you login is pending state "



//         });
//         builder.addCase(loginCheck.rejected, (state, action) => {
//             state.isLoading = false;
//             state.message = " you login is rejected "


//         })


//     }
// })



// export default loginSlice.reducer;
// export const { } = loginSlice.actions;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for login
export const loginCheck = createAsyncThunk("login/check", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch("https://api.thailash.com/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // ✅ send payload (email + password)
    });

    if (!response.ok) {
      return rejectWithValue("Invalid credentials");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    message: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginCheck.pending, (state) => {
      state.isLoading = true;
      state.message = "Login is pending...";
    });
    builder.addCase(loginCheck.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // ✅ store response data
      state.message = "You have logged in successfully!";
    });
    builder.addCase(loginCheck.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload || "Login failed!";
    });
  },
});

export default loginSlice.reducer;
