import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateProduct,
  resetEditproductData,
  createProduct,
  getProductById,
} from "../../../store/slice/productSlice";
import "../product/product.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const productselector = useSelector((state) => state.product);

  const { id = 0 } = useParams();

  const [editProductData, setEditProductData] = useState({
    id: "",
    name: "",
    retting: "",
    message: "",
    is_active: false,
  });

  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    if (id == 0) {
      dispatch(createProduct(editProductData))
        .unwrap()
        .then(() => {
          navigate("/dashboard/product");
          toast.success("Product created successfully!.");
        })
        .catch(() => {
          toast.error("Failed to create product");
        });
    } else {
      // create new
      dispatch(updateProduct({ ...editProductData, id }))
        .unwrap()
        .then(() => {
          navigate("/dashboard/product");
          toast.success("Product updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update product");
        });
    }
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
        bottle_size: productselector.editproductData.bottle_size || "",
        offer_price: productselector.editproductData.offer_price || "",
        actual_price: productselector.editproductData.actual_price || "",
        sku: productselector.editproductData.sku || "",
        stock_quantity: productselector.editproductData.stock_quantity || "",
        is_active: productselector.editproductData.is_active || false,
      });
    }
  }, [productselector]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

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
                id="offer_price"
                required
                value={editProductData?.offer_price || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="name-container">
            <label htmlFor="bottle_size" className="name-labels">
              bottle size
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="bottle_size"
                required
                value={editProductData?.bottle_size || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="title" className="name-labels">
              Tittle
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={editProductData?.title || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="name-container">
            <label htmlFor="actual_price" className="name-labels">
              Actual price
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="actual_price"
                required
                value={editProductData?.actual_price || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="name-container">
            <label htmlFor="sku" className="name-labels">
              Sku
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="sku"
                required
                value={editProductData?.sku || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="name-container">
            <label htmlFor="stock_quantity" className="name-labels">
              Stock quantity
            </label>
            <div className="input-1">
              <input
                type="text"
                className="form-control"
                id="stock_quantity"
                required
                value={editProductData?.stock_quantity || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="description" className="name-labels">
              description
            </label>
            <div className="input-1">
              <textarea
                className="form-control"
                id="description"
                rows="4"
                required
                value={editProductData?.description || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="image">Product Image</label>
            <div>
              <img
                // src={logo || noImage}
                className="form-control cursor-pointer"
                name="image"
                alt="logo"
                // onClick={handleImageClick}
              />
              {/* <input
                                type="file"
                                accept="image/*"
                            /> */}
            </div>
          </div>

          <div className="name-container">
            <label htmlFor="is_active" className="name-labels">
              Is Featured
            </label>
            <label className="switch">
              <input
                className="switch-box"
                type="checkbox"
                id="is_active"
                // checked={editProductData?.is_active || false}
                onChange={(e) =>
                  setEditProductData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
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

export default EditProduct;
