import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin, Row, Col, Button } from "antd";
import { getAllProduct, updateOrder } from "../../../store/slice/orderSlice";
import "./viewOrder.css";

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
        updateOrder({
          orderId: orderData.id,
          status: orderData.status ? "refunded" : ".",
        }),
        console.log("status", orderData.status)
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
      <div className="view-name" style={{ marginBottom: 20 }}>
        View Order
      </div>

      <Form layout="horizontal" className="order-form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ID"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.id} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Order ID"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.order} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Name"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.phone} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Country"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.country} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Pin"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.pin} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="City"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.city} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="State"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.state} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Quantity"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.quantity} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Invoice Amount"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.invoiceAmount} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="TaxGross"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.taxExclusiveGross} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SKU"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.sku} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="CGST"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.cgstTax} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SGST"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.sgstTax} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="UTGST"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.utgstTax} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="IGST"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.igstTax} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Address"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.address} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address Type"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.address_type} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="AWB"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.waybill} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Customer Name"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.buyerName} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Payment Method"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.payment} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Delivery Response"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.delhivery_response} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Shipping Mode"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.shipping_mode} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Remarks"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.remarks} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Created At"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input
                value={
                  orderData.createdAt
                    ? new Date(orderData.createdAt).toLocaleDateString()
                    : ""
                }
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Refund"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Switch
                checkedChildren="Refunded"
                unCheckedChildren="Not Refunded"
                checked={orderData.status === "refunded"}
                onChange={(checked) =>
                  setOrderData({
                    ...orderData,
                    status: checked ? "refunded" : ".",
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="view-order-buttons">
        <Button className="vieworder-cancelbutton" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          className="vieworder-savebutton"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default ViewOrder;
