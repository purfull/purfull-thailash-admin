import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const testimonialGetAll = createAsyncThunk(
  "testimonial/get-all",
  async () => {
    const responce = await fetch("https://api.thailash.com/testimonial");
    const data = responce.json();
    return data;
  }
);

export const getTestimonialById = createAsyncThunk(
  "testimonial/get-testimonial",
  async (payload) => {
    const responce = await fetch(
      `https://api.thailash.com/testimonial/get-testimonial/${payload}`
    );
    const data = responce.json();
    return data;
  }
);

export const deleteTestimonialById = createAsyncThunk(
  "testimonial/delete-testimonial",
  async (id) => {
    const responce = await fetch(
      `https://api.thailash.com/testimonial/delete-testimonial/${id}`,
      { method: "DELETE" }
    );
    const data = responce.json();
    return { id, ...data };
  }
);

export const updateTestimonialById = createAsyncThunk(
  "testimonial/update-testimonial",
  async (payload) => {
    const response = await fetch(
      `https://api.thailash.com/testimonial/update-testimonial`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.updatedData),
      }
    );
    const data = response.json();
    return data;
  }
);

const testimonialSlice = createSlice({
  initialState: {
    isLoading: false,
    testimonialTableData: [],
    editTestimonialData: [],
    message: null,
  },
  name: "testimonial",
  reducers: {
    show(state, action) {
      state.push(action.payload);
    },
    resetEditTestimonialData(state, action) {
      state.editTestimonialData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(testimonialGetAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.testimonialTableData = action.payload.data;
    });
    builder.addCase(testimonialGetAll.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(testimonialGetAll.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getTestimonialById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.editTestimonialData = action.payload.data;
    });
    builder.addCase(getTestimonialById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTestimonialById.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTestimonialById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.testimonialTableData = state.testimonialTableData.filter(
        (item) => item.id !== action.payload.id
      );
    });
    builder.addCase(deleteTestimonialById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTestimonialById.rejected, (state, action) => {
      state.isLoading = false;
    });
    // builder.addCase(updateTestimonialById.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   const index = state.testimonialTableData.findIndex(
    //     (item) => item.id == action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.testimonialTableData[index] = {
    //       ...state.testimonialTableData[index],
    //       ...action.payload,
    //     };
    //   }
    // });
    // builder.addCase(updateTestimonialById.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateTestimonialById.rejected, (state, action) => {
    //   state.isLoading = false;
    // });
  },
});

export default testimonialSlice.reducer;
export const { show, resetEditTestimonialData } = testimonialSlice.actions;
