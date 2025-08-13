// import React from 'react'

// const store = () => {
//   return (
//     <div>store</div>
//   )
// }

// export default store

import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./slice/orderSlice";

import testimonialSlice from "./slice/testimonailSlice";

const store = configureStore({
  reducer: {
    testimonial: testimonialSlice,
    order: orderSlice,
  },
});

export default store;
