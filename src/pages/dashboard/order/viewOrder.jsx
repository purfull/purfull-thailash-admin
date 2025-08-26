import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin, Row, Col, Button } from "antd";
import { getAllProduct, updateOrder } from "../../../store/slice/orderSlice";
import "./viewOrder.css";
import { useReactToPrint } from "react-to-print";
import thailashlogo from "../../dashboard/order/assets/logo/logo.svg";

const ViewOrder = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderTableData, isLoading } = useSelector((state) => state.order);
  const [editingData, setEdittingData] = useState({});
  const [orderData, setOrderData] = useState(null);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

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

  useEffect(() => {
    console.log(orderData, "orderData");
  }, [orderData]);
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
          {/* <Col span={12}>
            <Form.Item
              label="ID"
              className="view-order-tag"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.id} disabled />
            </Form.Item>
          </Col> */}
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

          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Name"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.name} disabled />
            </Form.Item>
          </Col> */}

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
              label="Invoice Number"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.waybill} disabled />
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
              label="Delivery Charges"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData?.productInfo?.delivery_charge} disabled />
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

      {editingData && (
        <div ref={componentRef} className="invoice-container">
          <div className="header">
            <p className="contact">
              Cell: 9597266083 <br /> 9003857938
            </p>

            <img src={thailashlogo} alt="thailash-logo" className="logo" />

            <p className="title">THAILASH ORIGINAL THENNAMARAKUDI OIL</p>
            <p className="address">
              3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br />
              Nagapattinam - 611 104
            </p>
          </div>

          <table className="invoice-table">
            <tbody>
              <tr>
                <td colSpan="6">Invoice Number: {orderData?.invoiceNumber}</td>
                <td colSpan="6">Invoice Date: {orderData?.invoiceDate}</td>
              </tr>
              <tr>
                <td colSpan="6">
                  <span className="bold">Billing Address:</span> <br />
                  <p className="medium">
                    {orderData?.address} <br /> {orderData?.city},{" "}
                    {orderData?.state}, {orderData?.country}
                  </p>
                </td>
                <td colSpan="6">
                  <span className="bold">Place Of Supply:</span> <br />
                  <p className="medium">
                    {orderData?.address} <br /> {orderData?.city},{" "}
                    {orderData?.state}, {orderData?.country}
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan="12">GSTIN: {orderData?.customerBillToGST}</td>
              </tr>
            </tbody>
          </table>

          <div className="body">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  <th>Delivery Charge</th>
                  <th>Amount</th>
                  <th>Taxable Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{orderData?.productInfo?.name}</td>
                  <td>{orderData?.quantity}</td>
                  <td>{parseInt(orderData?.offer_price || 0)}</td>

                  <td>
                    {orderData?.transactionType === "Pre-paid" ? "10%" : "-"}
                  </td>
                  <td>{orderData?.productInfo?.delivery_charge}</td>
                  <td>{orderData?.invoiceAmount}</td>

                  <td>{orderData?.taxExclusiveGross}</td>
                </tr>

                <tr>
                  <td colSpan="6" className="label">
                    SGST :
                  </td>
                  <td colSpan="2">{orderData?.sgstTax}</td>
                </tr>
                <tr>
                  <td colSpan="6" className="label">
                    CGST :
                  </td>
                  <td colSpan="2">{orderData?.cgstTax}</td>
                </tr>
                <tr>
                  <td colSpan="6" className="label">
                    IGST :
                  </td>
                  <td colSpan="2">{orderData?.igstTax}</td>
                </tr>
                <tr>
                  <td colSpan="6" className="label">
                    UTGST :
                  </td>
                  <td colSpan="2">{orderData?.utgstTax}</td>
                </tr>
                <tr>
                  <td colSpan="6" className="label">
                    Total GST Amount:
                  </td>
                  <td colSpan="2">{orderData?.totalTaxAmount}</td>
                </tr>
                <tr>
                  <td colSpan="6" className="label">
                    Roundoff:
                  </td>
                  <td colSpan="2">
                    {(
                      parseFloat(orderData?.invoiceAmount) -
                      ((Number(orderData?.totalTaxAmount) || 0) +
                        (Number(editingData?.taxExclusiveGross) || 0))
                    ).toFixed(2)}
                  </td>
                </tr>
                {/* <tr>
                  <td colSpan="6" className="label">
                    Delivery Charges :
                  </td>
                  <td colSpan="2">{orderData?.productInfo?.delivery_charge}</td>
                </tr> */}
                <tr>
                  <td colSpan="3" className="center bold">
                    HSN Code: 30049011 GST: 12%
                  </td>
                  <td colSpan="3" className="label">
                    Total Invoice Amount:
                  </td>
                  <td colSpan="3" className="bold">
                    {orderData?.invoiceAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="order-invoice-container">
        <button
          type="button"
          onClick={handlePrint}
          className="order-download-button"
        >
          Download Invoice
        </button>
      </div>

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
