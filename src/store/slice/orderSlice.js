import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProduct = createAsyncThunk("order/get-all", async () => {
  const response = await fetch("https://api.thailash.com/order/get-all-orders");
  const data = await response.json();
  return data;
});

export const updateOrder = createAsyncThunk("order/post", async (payload) => {
  const response = await fetch(`https://api.thailash.com/order/update-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    message: null,
    orderTableData: [],
    editOrderData: [],
  },
  reducers: {
    show(state, action) {
      state.push = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      (state.isLoading = false), (state.orderTableData = action.payload.data);
      state.message = "order done successfully";
    }),
      builder.addCase(getAllProduct.pending, (state, action) => {
        (state.isLoading = true), (state.message = "order loading");
      }),
      builder.addCase(getAllProduct.rejected, (state, action) => {
        (state.isLoading = false), (state.message = "order is rejected");
      });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      (state.message = "Refund status updated"),
        (state.editOrderData = action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      (state.isLoading = true), (state.message = "refund loading");
    }),
      builder.addCase(updateOrder.rejected, (state, action) => {
        (state.isLoading = false), (state.message = "refund is rejected");
      });
  },
});

export default orderSlice.reducer;
export const { show } = orderSlice.actions;
