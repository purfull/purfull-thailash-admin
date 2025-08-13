import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productEditById,resetEditproductData } from "../../../store/slice/productSlice";
import "../product/product.css";

const EditProduct = () => {

    const navigate = useNavigate();
    const productselector = useSelector((state) => state.product);
    const { productEditById } = useSelector((state) => state.testimonial);
      const { editTestimonialData } = useSelector((state) => state.testimonial);
    

    const { id } = useParams();

    const [editData, setEditData] = useState({
        name: "",
        retting: "",
        message: "",
        is_active: false,
    });

    const dispatch = useDispatch();

    const handleSave = (id) => {
        setEditData(id);
        console.log("success");
    };

      const handleCancel = (id) => {
        dispatch(resetEditproductData());
        navigate(`/dashboard/product`);
      };

    useEffect(() => {
        if (productselector.editproductData) {
            setEditData({
                name: productselector.editproductData.name || "",
                retting: productselector.editproductData.retting || "",
                message: productselector.editproductData.message || "",
                is_active: productselector.editproductData.is_active || false,
            });
        }
    }, [productselector]);

    // useEffect(() => {
    //     dispatch(productEditById(id));
    // }, []);
    // useEffect(()=>{
    //     dispatch()
    // })
    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    return (
        <div>
            <form>
                <div className="main-container">
                    <div className="name-container">
                        <label htmlFor="name" className="name-labels">
                            Product Name
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
                            Bottle Size
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
                        <label htmlFor="retting" className="name-labels">
                            Size
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
                            Is Featured
                        </label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="is_active"
                            // checked={editData?.is_active || false}
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
                    <button className="button-cancel" onClick={handleCancel} >
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

export default EditProduct;
