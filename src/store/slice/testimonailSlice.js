import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const testimonialGetAll = createAsyncThunk("testimonial/get-all", async () => {

    const responce = await fetch("https://api.thailash.com/testimonial")
    const data = responce.json()
    return data

})


const testimonialSlice = createSlice({
    initialState: {
        isLoading: false,
        testimonialTableData: [],
        message: null
    },
    name: "testimonial",
    reducers: {
        show(state, action) {
            state.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(testimonialGetAll.fulfilled, (state, action) => {
            state.isLoading = false
            state.testimonialTableData = action.payload.data
        })
        builder.addCase(testimonialGetAll.pending, (state, action) => {
            state.isLoading = true

        })
        builder.addCase(testimonialGetAll.rejected, (state, action) => {
            state.isLoading = false

        })
    }

})


export default testimonialSlice.reducer
export const { show } = testimonialSlice.actions