import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const customerGetAll = createAsyncThunk("customer/get-all", async () => {
  const responce = await fetch(
    "https://api.thailash.com/customer/get-all-customer"
  );
  const data = await responce.json();
  return data;
});

export const getCustomerById = createAsyncThunk(
  "customer/getById",
  async (id) => {
    const response = await fetch(
      `https://api.thailash.com/customer/get-customer-detial/${id}`
    );
    return await response.json();
  }
);

const customerSlice = createSlice({
  // initialState: 1,
  initialState: {
    isLoading: false,
    customerTableData: [],
    selectedCustomer: null,
    customerDetails: null,
    message: null,
  },
  name: "customer",
  reducers: {
    view: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },

  //custoemr bulid functions

  extraReducers: (builder) => {
    builder.addCase(customerGetAll.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.message = "customer fetched successfully"),
        (state.customerTableData = action.payload.data);
    });
    builder.addCase(customerGetAll.pending, (state, action) => {
      (state.isLoading = true),
        (state.message = "Your customer is pending state ");
    });
    builder.addCase(customerGetAll.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "Your fetching Customer deatils is Failed";
    });
    builder.addCase(getCustomerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCustomerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerDetails = action.payload;
    });
    builder.addCase(getCustomerById.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default customerSlice.reducer;
export const { view } = customerSlice.actions;
