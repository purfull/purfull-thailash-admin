// import React from 'react'

// const store = () => {
//   return (
//     <div>store</div>
//   )
// }

// export default store

import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./slice/orderSlice";

import testimonialSlice from "./slice/testimonailSlice"
import productSlice from "./slice/productSlice"
import customerSlice from "./slice/customerSlice"
import billingsSlice from "./slice/billingsSlice"



const store = configureStore({
    reducer: {
        testimonial:testimonialSlice ,
        product : productSlice,
        customer :customerSlice,
        billings :billingsSlice,
      
    order: orderSlice,
    }
})

export default store;
