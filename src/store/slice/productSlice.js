import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";



export const productGetAll = createAsyncThunk("product/get-all", async () => {
    const responce = await fetch("https://api.thailash.com/admin/products");
    const data = responce.json()
    return data
})

export const productEditById = createAsyncThunk("product/get-product", async (state, action) => {
    const responce = await fetch(`https://api.thailash.com/admin/products-detial/${row.id}`)
    const data = responce.json();
    return data

})

const productSlice = createSlice({
    // initialState: 1,
    initialState: {
        isLoading: false,
        productTableData: [],
        editproductData: [],
        message: null,
    },
    name: "product",
    reducers: {
        show: ((state, action) => {
            state.push = (action.payload)
        }),
        resetEditproductData(state, action) {
            state.editproductData = [];
        },
    },
    extraReducers: (builder) => {

        builder.addCase(productGetAll.fulfilled, (state, action) => {

            state.isLoading = false,
                state.message = "product fetched successfully",
                state.productTableData = action.payload.data

        })
        builder.addCase(productGetAll.pending, (state, action) => {

            state.isLoading = true,
                state.message = "product is pending state and loading"

        })
        builder.addCase(productGetAll.rejected, (state, action) => {

            state.isLoading = false,
                state.message = "product fetching is failed"

        })

        //edit products

        builder.addCase(productEditById.fulfilled, (state, action) => {
            state.isLoading = false,
                state.editTestimonialData = action.payload.data;
            state.message = "product fetched successfully"
        })
        builder.addCase(productEditById.pending, (state, action) => {
            state.isLoading = true;


        })
        builder.addCase(productEditById.rejected, (state, action) => {
            state.isLoading = false;

        })
    },


})


export default productSlice.reducer
export const { show, resetEditproductData, } = productSlice.actions