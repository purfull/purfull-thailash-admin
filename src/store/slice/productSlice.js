import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";


export const createProduct = createAsyncThunk(
    "product/create",
    async (payload) => {
        const response = await fetch("https://api.thailash.com/admin/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
    }
);


export const getProductById = createAsyncThunk("product/create/get-byid",
    async (payload) => {
        const response = await fetch(`https://api.thailash.com/admin/products-detial/${payload}`);
        const data = await response.json();
        return data;
    }
);



export const productGetAll = createAsyncThunk("product/get-all", async () => {
    const responce = await fetch("https://api.thailash.com/admin/products");
    const data = responce.json()
    return data
})

export const updateProduct = createAsyncThunk("product/udpate-product", async (payload) => {
    const responce = await fetch(`https://api.thailash.com/admin/products`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    const data = responce.json();
    return data

})

export const deleteProductById = createAsyncThunk("product/delete-product", async (id) => {
    const responce = await fetch(
        `https://api.thailash.com/admin/products/${id}`,
        { method: "DELETE" }
    );
    const data = responce.json();
    return { id, ...data };
}
);

const productSlice = createSlice({
    // initialState: 1,
    initialState: {
        rowToDelete: [],
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

        //add product 

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.message = "product added successfuly"

        })
        builder.addCase(createProduct.pending, (state, action) => {
            state.isLoading = true
            state.message = " Your poduct addding is still pending state"
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.message = " Your product adding is failed"
        })

        //get all 
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
        //getProductById
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.editproductData = action.payload.data;
        })

        builder.addCase(getProductById.pending, (state,action) => {
            state.isLoading = true;
        })

        builder.addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false;
        });

        //edit products (update)

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false,
                state.editproductData = action.payload.data;
            state.message = "product fetched successfully"
        })
        builder.addCase(updateProduct.pending, (state, action) => {
            state.isLoading = true;


        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;

        })

        //delete product
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productTableData = state.productTableData.filter(
                (item) => item.id !== action.payload.id
            );

        })
        builder.addCase(deleteProductById.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(deleteProductById.rejected, (state, action) => {
            state.isLoading = false
        })


    },


})


export default productSlice.reducer
export const { show, resetEditproductData, } = productSlice.actions