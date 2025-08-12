import React from 'react'
import { show } from '../../store/slice/testimonailSlice'
import { useDispatch, useSelector } from 'react-redux'



const Testimonial = () => {
    //   const useselector = useSelector((state) => state.com);

    const testimonialSelector =  useSelector((state)=> state.testimonial) 
    
    const dispatch = useDispatch(show());

     

  return (
    <h1>{testimonialSelector}</h1>
  )
}

export default Testimonial