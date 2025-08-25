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
import DashboardReportSlice from "./slice/dashboardReportSlice"
import loginSlice from "./slice/loginSlice"


const store = configureStore({
    reducer: {
        testimonial: testimonialSlice,
        product: productSlice,
        customer: customerSlice,
        billings: billingsSlice,
        order: orderSlice,
        dashboard : DashboardReportSlice,
        login :loginSlice

    }
})

export default store;
