// import React from 'react'

// const store = () => {
//   return (
//     <div>store</div>
//   )
// }

// export default store


import { configureStore } from "@reduxjs/toolkit";

import testimonialSlice from "./slice/testimonailSlice"



const store = configureStore({
    reducer: {
        testimonial:testimonialSlice ,
    }
})

export default store