// src/pages/dashboard/Customer/ViewCustomer.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById } from "../../../store/slice/customerSlice";

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
    <div title="View Customer">
      <Form form={form} layout="vertical" disabled>
        <Form.Item label="First Name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Created At" name="createdAt">
          <Input />
        </Form.Item>
      </Form>
      <button onClick={() => navigate("/dashboard/customer")}>Cancel</button>
    </div>
  );
};

export default ViewCustomer;
