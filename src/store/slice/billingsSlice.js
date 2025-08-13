import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

export const billingsGetAll = createAsyncThunk("billings/get-all", async (state, action) => {
  const responce = await fetch("https://api.thailash.com/order/get-all-bills")
  const data = responce.json();
  return data
})

const billingsSlice = createSlice({
  // initialState: 1,
  initialState: {
    isLoading: false,
    billingsTableData: [],
    message: null,
  },
  name: "billings",
  reducers: {
    view: ((state, action) => {
      state.psuh = (action.payload)
    })
  },

  //custoemr bulid functions

  extraReducers: (builder) => {
    builder.addCase(billingsGetAll.fulfilled, (state, action) => {
      state.isLoading = false,
        state.message = "billings fetched successfully",
        state.billingsTableData = action.payload.data


    })
    builder.addCase(billingsGetAll.pending, (state, action) => {

      state.isLoading = true,
        state.message = "Your billings is pending state "


    })
    builder.addCase(billingsGetAll.rejected, (state, action) => {

      state.isLoading = false
      state.message = "Your fetching billings deatils is Failed"


    })
  }
})


export default billingsSlice.reducer
export const { view } = billingsSlice.actions