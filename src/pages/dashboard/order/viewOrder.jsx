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
              className="view-order-tag"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.id} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Order ID"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.order} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Name"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Phone"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.phone} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Country"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.country} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Pin"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.pin} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="City"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.city} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="State"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.state} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Quantity"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.quantity} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Invoice Amount"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.invoiceAmount} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="TaxGross"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.taxExclusiveGross} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="SKU"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.sku} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="CGST"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.cgstTax} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="SGST"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.sgstTax} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="UTGST"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.utgstTax} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="IGST"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.igstTax} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Address"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.address} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Address Type"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.address_type} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="AWB"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.waybill} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Customer Name"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.buyerName} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Payment Method"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.payment} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Delivery Response"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.delhivery_response} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Shipping Mode"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.shipping_mode} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Remarks"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.remarks} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="view-order-tag"

              label="Created At"
              labelCol={{ span: 6 }}
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
              className="view-order-tag"
              label="Refund"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Switch
                          className="view-order-tag"

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
