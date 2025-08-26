// src/pages/dashboard/Customer/ViewCustomer.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById } from "../../../store/slice/customerSlice";
import  "../customer/customer.css"

const ViewCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, customerDetails } = useSelector((state) => state.customer);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [id]);

  useEffect(() => {
    if (customerDetails?.data) {
      form.setFieldsValue(customerDetails.data);
    }
  }, [customerDetails, form]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div title="View-customer" className="view-customer">
      {/* <h1 className="helo">hello</h1> */}
      <Form form={form} layout="vertical" className="flex" disabled>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="first_name" className="flex-one">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="last_name">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Postal Code" name="postal_code">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State" name="state">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="GST" name="gst">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Created At" name="createdAt">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Button
        style={{ marginTop: 16 }}
        onClick={() => navigate("/dashboard/customer")}
      >
        Cancel
      </Button>
    </div>
  );
};
export default ViewCustomer;
