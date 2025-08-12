import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonialById } from "../../store/slice/testimonailSlice";

const EditTestimonial = () => {
  const testimonialSelector = useSelector((state) => state.testimonial);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getTestimonialById(1));
  },[])
  return (
  <div>EditTestimonial</div>

);
};

export default EditTestimonial;
