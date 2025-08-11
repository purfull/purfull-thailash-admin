import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const testimonialapi = createAsyncThunk("testimonialapi", async () => {

    const responce = await fetch("https://api.thailash.com/testimonial")
    const data = responce.json()
    return data

})


const testimonialSlice = createSlice({
    initialState: {
        isloader: false,
        message: null
    },
    name: "testimonial",
    reducers: {
        show(state, action) {
            state.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(testimonialapi.fulfilled, (state, action) => {
                

        })
        builder.addCase(testimonialapi.pending, (state, action) => {

        })
        builder.addCase(testimonialapi.rejected, (state, action) => {

        })
    }

})


export default testimonialSlice.reducer
export const { show } = testimonialSlice.actions