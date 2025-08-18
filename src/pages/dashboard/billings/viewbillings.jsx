import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin } from "antd";
import {
  ViewBillbyid,
  CreateBill,
  // updateBill,
} from "../../../store/slice/billingsSlice";
// import "./viewOrder.css";
import { Button } from "antd/es/radio";

const ViewBillings = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBill } = useSelector((state) => state.billings);
  const [billingsdata, setBillingsData] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(ViewBillbyid(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedBill) {
      setBillingsData(selectedBill.data);
    }
  }, [selectedBill]);

  const handleSave = () => {
    if (billingsdata.id) {
      // Create new bill
      dispatch(CreateBill(billingsdata)).then(() => {
        navigate("/dashboard/billings");
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/billings");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingsData({
      ...billingsdata,
      [name]: value, // dynamic key update
    });
  };

  return (
    <div className="view-order-title">
      <div className="view-name">View Bills</div>

      <Form layout="horizontal" className="order-form">
        <Form.Item label="Order ID" className="formOrder-heading">
          <Input
            name="id"
            className="formOrder-input"
            value={billingsdata?.id || ""}
            onChange={handleChange}
            //disabled
          />
        </Form.Item>

        <Form.Item label="Customer Name" className="formOrder-heading">
          <Input
            name="name"
            className="formOrder-input"
            value={billingsdata?.name || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="Address" className="formOrder-heading">
          <Input
            name="address"
            className="formOrder-input"
            value={billingsdata?.address || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="City" className="formOrder-heading">
          <Input
            name="city"
            className="formOrder-input"
            value={billingsdata?.city || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="State" className="formOrder-heading">
          <Input
            name="state"
            className="formOrder-input"
            value={billingsdata?.state || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="Pin" className="formOrder-heading">
          <Input
            name="pin"
            className="formOrder-input"
            value={billingsdata?.pin || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="Country" className="formOrder-heading">
          <Input
            name="country"
            className="formOrder-input"
            value={billingsdata?.country || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="Invoice Amount" className="formOrder-heading">
          <Input
            name="invoiceAmount"
            className="formOrder-input"
            value={billingsdata?.invoiceAmount || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        {/* <Form.Item label="Payment Method" className="formOrder-heading">
          <Input
            name="payment"
            className="formOrder-input"
            value={billingsdata?.payment || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item> */}
        <Form.Item label="Created At" className="formOrder-heading">
          <Input
            className="formOrder-input"
            type="date"
            value={
              billingsdata?.createdAt
                ? new Date(billingsdata.createdAt).toLocaleDateString()
                : ""
            }
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        {/* <Form.Item label="Refund" className="formOrder-heading">
          <Switch
            checkedChildren="Refunded"
            unCheckedChildren="Not Refunded"
            checked={billingsdata.refund === true}
            onChange={(checked) =>
              setBillingsData({
                ...billingsdata,
                refund: checked,
              })
            }
          />
        </Form.Item> */}
      </Form>

      <div className="view-order-buttons">
        <Button className="vieworder-cancelbutton" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="vieworder-savebutton" onClick={handleSave}>
          Save Bill
        </Button>
      </div>
    </div>
  );
};

export default ViewBillings;
