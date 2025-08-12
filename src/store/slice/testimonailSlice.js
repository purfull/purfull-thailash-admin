import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const testimonialGetAll = createAsyncThunk("testimonial/get-all", async () => {

    const responce = await fetch("https://api.thailash.com/testimonial")
    const data = responce.json()
    return data

})

export const getTestimonialById = createAsyncThunk("testimonial/get-testimonial", async (payload) => {

    const responce = await fetch(`https://api.thailash.com/testimonial/get-testimonial/${payload}`)
    const data = responce.json()
    return data

})

const testimonialSlice = createSlice({
    initialState: {
        isLoading: false,
        testimonialTableData: [],
        EditTestimonialData: [],
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
        builder.addCase(getTestimonialById.fulfilled, (state, action) => {
            state.isLoading = false
            state.EditTestimonialData = action.payload.data
        })
        builder.addCase(getTestimonialById.pending, (state, action) => {
            state.isLoading = true

        })
        builder.addCase(getTestimonialById.rejected, (state, action) => {
            state.isLoading = false

        })
    }

})


export default testimonialSlice.reducer
export const { show } = testimonialSlice.actions