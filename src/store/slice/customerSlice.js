import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

export const customerGetAll = createAsyncThunk("customer/get-all", async (state, action) => {
  const responce = await fetch("https://api.thailash.com/customer/get-all-customer")
  const data = responce.json();
  return data
})

const customerSlice = createSlice({
  // initialState: 1,
  initialState: {
    isLoading: false,
    customerTableData: [],
    // editproductData: [],
    message: null,
  },
  name: "customer",
  reducers: {
    view: ((state, action) => {
      state.psuh = (action.payload)
    })
  },

  //custoemr bulid functions

  extraReducers: (builder) => {
    builder.addCase(customerGetAll.fulfilled, (state, action) => {
      state.isLoading = false,
        state.message = "customer fetched successfully",
        state.customerTableData = action.payload.data


    })
    builder.addCase(customerGetAll.pending, (state, action) => {

      state.isLoading = true,
        state.message = "Your customer is pending state "


    })
    builder.addCase(customerGetAll.rejected, (state, action) => {

      state.isLoading = false
      state.message = "Your fetching Custoemr deatils is Failed"


    })
  }
})


export default customerSlice.reducer
export const { view } = customerSlice.actions