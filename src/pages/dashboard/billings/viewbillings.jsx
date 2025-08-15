import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin } from "antd";
import { ViewBillbyid } from "../../../store/slice/billingsSlice";
// import "./viewOrder.css";
import { Button } from "antd/es/radio";

const ViewBillings = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [billingsdata, setBillingsData] = useState("");


      useEffect(() => {
        dispatch(ViewBillbyid(id))
    }, [])

  const handleCancel = () => {
    navigate("/dashboard/billings");
  };


  return (
    <div className="view-order-title">
      <div className="view-name">View Bills</div>

      <Form layout="horizontal" className="order-form">
        <Form.Item label="Order ID" className="formOrder-heading">
          <Input className="formOrder-input" value={billingsdata.id} disabled />
        </Form.Item>
        <Form.Item label="AWB" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={billingsdata.waybill}
            disabled
          />
        </Form.Item>
        <Form.Item label="Customer Name" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={billingsdata.buyerName}
            disabled
          />
        </Form.Item>
        <Form.Item label="Payment Method" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={billingsdata.payment}
            disabled
          />
        </Form.Item>
        <Form.Item label="Created At" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={
              billingsdata.createdAt
                ? new Date(billingsdata.createdAt).toLocaleDateString()
                : ""
            }
            disabled
          />
        </Form.Item>
        <Form.Item label="Refund" className="formOrder-heading">
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
        </Form.Item>
      </Form>

      
      <div className="view-order-buttons">
        <Button className="vieworder-cancelbutton" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="vieworder-savebutton" >
          Save Bill
        </Button>
      </div>
    </div>
  );
};

export default ViewBillings;
