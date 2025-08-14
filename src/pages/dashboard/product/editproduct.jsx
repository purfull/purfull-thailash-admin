import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productEditById, resetEditproductData } from "../../../store/slice/productSlice";
import "../product/product.css";

const EditProduct = () => {

    const navigate = useNavigate();
    const productselector = useSelector((state) => state.product);
    // const { productEditById } = useSelector((state) => state.testimonial);
    //   const { editTestimonialData } = useSelector((state) => state.testimonial);


    const { id } = useParams();

    const [editProductData, setEditProductData] = useState({
        id: "",
        name: "",
        retting: "",
        message: "",
        is_active: false,
    });

    const dispatch = useDispatch();

    const handleSave = (id) => {
        setEditProductData(id);
        console.log("success");
    };

    const handleCancel = (id) => {
        dispatch(resetEditproductData());
        navigate(`/dashboard/product`);
    };

    useEffect(() => {
        if (productselector.editproductData) {
            setEditProductData({
                name: productselector.editproductData.name || "",
                title: productselector.editproductData.title || "",
                description: productselector.editproductData.description || "",
                bottlesize: productselector.editproductData.bottle_size || "",
                offer_price: productselector.editproductData.offer_price || "",
                actual_price: productselector.editproductData.actual_price || "",
                sku: productselector.editproductData.sku || "",
                stock_quantity: productselector.editproductData.stock_quantity || "",
                is_active: productselector.editproductData.is_active || false,
            });
        }
    }, [productselector]);


    useEffect(() => {
        dispatch(productEditById(id))
    }, [])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditProductData((prev) => ({
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
                                value={editProductData?.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            offer price
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.offer_price || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            bottle size
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.bottle_size || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            Tittle
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.title || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            Actual price
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.actual_price || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            Sku
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.sku || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="name-container">
                        <label htmlFor="retting" className="name-labels">
                            Stock quantity
                        </label>
                        <div className="input-1">
                            <input
                                type="text"
                                className="form-control"
                                id="retting"
                                required
                                value={editProductData?.stock_quantity || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="name-container">
                        <label htmlFor="message" className="name-labels">
                            description
                        </label>
                        <div className="input-1">
                            <textarea
                                className="form-control"
                                id="message"
                                rows="4"
                                required
                                value={editProductData?.description || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

               
                    <div className="name-container">
                        <label htmlFor="name">Product Image</label>
                        <div>
                            <img
                                // src={logo || noImage}
                                className="form-control cursor-pointer"
                                name="image"
                                alt="logo"
                                // onClick={handleImageClick}
                            />
                            <input
                                type="file"
                                accept="image/*"
                            />
                        </div>
                    </div>


                       <div className="name-container">
                        <label htmlFor="is_active" className="name-labels">
                            Is Featured
                        </label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="is_active"
                                // checked={editProductData?.is_active || false}
                                onChange={(e) =>
                                    ({ ...editProductData, is_active: e.target.checked })
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
