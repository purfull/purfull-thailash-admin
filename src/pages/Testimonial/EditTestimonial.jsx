import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTestimonialById,
  resetEditTestimonialData,
  updateTestimonialById,
} from "../../store/slice/testimonailSlice";
import "../Testimonial/EditTestimonial.css";
import { message } from "antd";

const EditTestimonial = () => {
  const navigate = useNavigate();
  const testimonialSelector = useSelector((state) => state.testimonial);
  const { editTestimonialData } = useSelector((state) => state.testimonial);

  const { id } = useParams();

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    retting: "",
    message: "",
    is_active: false,
  });

  const dispatch = useDispatch();

  // const handleSave = (id) => {
  //   setEditData(id);
  //   console.log("success");
  // };
  const handleCancel = (id) => {
    dispatch(resetEditTestimonialData());
    navigate(`/dashboard/testimonial`);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateTestimonialById({ id, updatedData: editData }))
      .unwrap()
      .then(() => {
        message.success("Data updated successfully!");
        navigate("/dashboard/testimonial");
      })
      .catch((err) => {
        message.error("Failed to update data!");
        console.error("Update failed", err);
      });
  };

  useEffect(() => {
    if (testimonialSelector.editTestimonialData) {
      setEditData({
        id: testimonialSelector.editTestimonialData.id || "",
        name: testimonialSelector.editTestimonialData.name || "",
        retting: testimonialSelector.editTestimonialData.retting || "",
        message: testimonialSelector.editTestimonialData.message || "",
        is_active: testimonialSelector.editTestimonialData.is_active || false,
      });
    }
  }, [testimonialSelector]);

  useEffect(() => {
    dispatch(getTestimonialById(id));
  }, []);

  return (
    <div>
      <form>
        <div className="main-container">
          <div className="name-container">
            <label htmlFor="name" className="name-labels">
              Name
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={editData?.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="retting" className="name-labels">
              Rating
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="retting"
                required
                value={editData?.retting || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="message" className="name-labels">
              Message
            </label>
            <div className="input-1">
              <textarea
                className="form-control"
                id="message"
                rows="4"
                required
                value={editData?.message || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* <div className="w-full sm:w-[70%] flex justify-between my-[4vh]"> */}
          <div className="name-container">
            <label htmlFor="is_active" className="name-labels">
              Is Active
            </label>
            <label className="switch">
              <input
                type="checkbox"
                id="is_active"
                checked={editData?.is_active || false}
                onChange={(e) =>
                  setEditData({ ...editData, is_active: e.target.checked })
                }
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        {/* </div> */}
        <div className="testimonial-buttons">
          <button className="button-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="button-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonial;
