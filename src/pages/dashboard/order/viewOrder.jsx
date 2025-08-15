import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin } from "antd";
import { getAllProduct, updateOrder } from "../../../store/slice/orderSlice";
import "./viewOrder.css";
import { Button } from "antd/es/radio";

const ViewOrder = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderTableData, isLoading } = useSelector((state) => state.order);

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!orderTableData.length) {
      dispatch(getAllProduct());
    }
  }, [orderTableData.length]);

  //When orders are loaded, find the one we need
  useEffect(() => {
    if (orderTableData.length) {
      const foundOrder = orderTableData.find(
        (order) => order.id === parseInt(id)
      );
      setOrderData(foundOrder || null);
    }
  }, [orderTableData, id]);

  const handleCancel = () => {
    navigate("/dashboard/order");
  };

  // Handle saving refund status
  const handleSave = () => {
    if (orderData) {
      dispatch(
        updateOrder({ orderId: orderData.id, status: orderData.refund })
      );
    }
  };

  if (isLoading || !orderData) {
    return isLoading ? (
      <Spin className="view-order-loading" size="large" />
    ) : (
      <p className="view-order-not-found">Order not found.</p>
    );
  }
  return (
    <div className="view-order-title">
      <div className="view-name">View Order</div>

      <Form layout="horizontal" className="order-form">
        <Form.Item label="Order ID" className="formOrder-heading">
          <Input className="formOrder-input" value={orderData.id} disabled />
        </Form.Item>
        <Form.Item label="AWB" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={orderData.waybill}
            disabled
          />
        </Form.Item>
        <Form.Item label="Customer Name" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={orderData.buyerName}
            disabled
          />
        </Form.Item>
        <Form.Item label="Payment Method" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={orderData.payment}
            disabled
          />
        </Form.Item>
        <Form.Item label="Created At" className="formOrder-heading">
          <Input
            className="formOrder-input"
            value={
              orderData.createdAt
                ? new Date(orderData.createdAt).toLocaleDateString()
                : ""
            }
            disabled
          />
        </Form.Item>
        <Form.Item label="Refund" className="formOrder-heading">
          <Switch
            checkedChildren="Refunded"
            unCheckedChildren="Not Refunded"
            checked={orderData.refund === true}
            onChange={(checked) =>
              setOrderData({
                ...orderData,
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
        <Button className="vieworder-savebutton" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ViewOrder;
