import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";

export const billingsGetAll = createAsyncThunk("billings/get-all", async () => {
  const responce = await fetch("https://api.thailash.com/order/get-all-bills");
  const data = await responce.json();
  return data;
});

export const ViewBillbyid = createAsyncThunk(
  "billings/view-by-id",
  async (id) => {
    const responce = await fetch(
      `https://api.thailash.com/order/get-bill/${id}`
    );
    const data = await responce.json();
    return data;
  }
);

export const updateBill = createAsyncThunk(
  "billings/update-bill",
  async (billingsdata) => {
    const responce = await fetch(
      `https://api.thailash.com/order/update-offline-bill/${billingsdata.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billingsdata),
      }
    );
    const data = await responce.json();
    return data;
  }
);

export const CreateBill = createAsyncThunk(
  "billings/create-bill",
  async (billingsdata) => {
    const responce = await fetch(
      `https://api.thailash.com/order/create-offline-bill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billingsdata),
      }
    );
    const data = await responce.json();
    return data;
  }
);

const billingsSlice = createSlice({
  // initialState: 1,
  initialState: {
    isLoading: false,
    billingsTableData: [], //for all bills
    message: null,
    selectedBill: null, // for edited
  },
  name: "billings",
  reducers: {
    view: (state, action) => {
      state.selectedBill = action.payload.data;
    },
  },

  //bilings bulid functions

  extraReducers: (builder) => {
    builder.addCase(billingsGetAll.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.message = "billings fetched successfully"),
        (state.billingsTableData = action.payload.data);
    });
    builder.addCase(billingsGetAll.pending, (state, action) => {
      (state.isLoading = true),
        (state.message = "Your billings is pending state ");
    });
    builder.addCase(billingsGetAll.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "Your fetching billings details is Failed";
    });
    //view bill

    builder.addCase(ViewBillbyid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedBill = action.payload;
      state.message = "You can view Bill successfully";
    });

    builder.addCase(ViewBillbyid.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Viewing Bill is pending";
    });
    builder.addCase(ViewBillbyid.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "View Bill is failed";
    });

    //create bill

    builder.addCase(CreateBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedBill = action.payload;
      state.message = "Your bills are saved";
    });

    builder.addCase(CreateBill.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Bills loading";
    });
    builder.addCase(CreateBill.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "Your billings details is Failed";
    });

    //update bill

    builder.addCase(updateBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedBill = action.payload;
      state.message = "Your changes are updated in bills";
    });

    builder.addCase(updateBill.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Bills loading";
    });
    builder.addCase(updateBill.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "changes made in bills is Failed";
    });
  },
});

export default billingsSlice.reducer;
export const { view } = billingsSlice.actions;
