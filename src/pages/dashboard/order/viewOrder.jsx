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
      console.log(
        "foundOrder?.taxExclusiveGross",
        foundOrder?.taxExclusiveGross
      );
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

      {/* <Form layout="horizontal" className="order-form">
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
          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Order ID"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.order} disabled />
            </Form.Item>
          </Col> */}

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

          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Customer Name"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.buyerName} disabled />
            </Form.Item>
          </Col> */}
{/* 
          <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Phone"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.phone} disabled />
            </Form.Item>
          </Col> */}

          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Country"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.country} disabled />
            </Form.Item>
          </Col> */}
          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="Pin"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.pin} disabled />
            </Form.Item>
          </Col> */}

          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="City"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.city} disabled />
            </Form.Item>
          </Col> */}
          {/* <Col span={12}>
            <Form.Item
              className="view-order-tag"
              label="State"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input value={orderData.state} disabled />
            </Form.Item>
          </Col> */}

          {/* <Col span={12}>
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
                className="view-order"
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
      </Form> */} 
      <Form layout="horizontal" className="order-form">
  <div className="grid-container">
    <div className="grid-item">
      <label>Order ID</label>
      <Input value={orderData.order} disabled />
    </div>

    <div className="grid-item">
      <label>Customer Name</label>
      <Input value={orderData.buyerName} disabled />
    </div>

    <div className="grid-item">
      <label>Phone</label>
      <Input value={orderData.phone} disabled />
    </div>

    <div className="grid-item">
      <label>Country</label>
      <Input value={orderData.country} disabled />
    </div>

    <div className="grid-item">
      <label>Pin</label>
      <Input value={orderData.pin} disabled />
    </div>

    <div className="grid-item">
      <label>City</label>
      <Input value={orderData.city} disabled />
    </div>

    <div className="grid-item">
      <label>State</label>
      <Input value={orderData.state} disabled />
    </div>

    <div className="grid-item">
      <label>Quantity</label>
      <Input value={orderData.quantity} disabled />
    </div>

    <div className="grid-item">
      <label>Invoice Amount</label>
      <Input value={orderData.invoiceAmount} disabled />
    </div>

    <div className="grid-item">
      <label>TaxGross</label>
      <Input value={orderData.taxExclusiveGross} disabled />
    </div>

    <div className="grid-item">
      <label>SKU</label>
      <Input value={orderData.sku} disabled />
    </div>

    <div className="grid-item">
      <label>CGST</label>
      <Input value={orderData.cgstTax} disabled />
    </div>

    <div className="grid-item">
      <label>SGST</label>
      <Input value={orderData.sgstTax} disabled />
    </div>

    <div className="grid-item">
      <label>UTGST</label>
      <Input value={orderData.utgstTax} disabled />
    </div>

    <div className="grid-item">
      <label>IGST</label>
      <Input value={orderData.igstTax} disabled />
    </div>

    <div className="grid-item">
      <label>Address</label>
      <Input value={orderData.address} disabled />
    </div>

    <div className="grid-item">
      <label>Address Type</label>
      <Input value={orderData.address_type} disabled />
    </div>

    <div className="grid-item">
      <label>Invoice Number</label>
      <Input value={orderData.waybill} disabled />
    </div>

    <div className="grid-item">
      <label>Payment Method</label>
      <Input value={orderData.payment} disabled />
    </div>

    <div className="grid-item">
      <label>Delivery Response</label>
      <Input value={orderData.delhivery_response} disabled />
    </div>

    <div className="grid-item">
      <label>Shipping Mode</label>
      <Input value={orderData.shipping_mode} disabled />
    </div>

    <div className="grid-item">
      <label>Remarks</label>
      <Input value={orderData.remarks} disabled />
    </div>

    <div className="grid-item">
      <label>Delivery Charges</label>
      <Input value={orderData?.productInfo?.delivery_charge} disabled />
    </div>

    <div className="grid-item">
      <label className="">Created At</label>
      <Input
        value={
          orderData.createdAt
            ? new Date(orderData.createdAt).toLocaleDateString()
            : ""
        }
        disabled
      />
    </div>

    <div className="grid-item-refund">
      <label>Refund</label>
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
    </div>
  </div>
</Form>


      {editingData && (
        <div ref={componentRef} className="invoice-container">
          <div className="invoice-header">
            <p className="invoice-contact">
              Cell: 9597266083 <br /> 9003857938
            </p>
            <img alt="Thailash Logo" src={thailashlogo} />
            <p className="company-name">THAILASH ORIGINAL THENNAMARAKUDI OIL</p>
            <p className="company-address">
              3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br />
              Nagapattinam - 611 104
            </p>
          </div>

          {/* Customer & Invoice Details */}
          <table className="invoice-table">
            <tbody className="table-body">
              <tr>
                <td colSpan="6">
                  <strong>Invoice Number:</strong>{" "}
                  {String(orderData?.invoiceNumber ?? "").padStart(4, "0")}
                </td>
                <td colSpan="6">
                  <strong>Invoice Date:</strong> {orderData?.invoiceDate}
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <strong>Customer Name:</strong> {orderData?.name}
                </td>
                <td colSpan="6">
                  <strong>Contact Number:</strong> {orderData?.phone}
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <strong>Billing Address:</strong> {orderData?.address}
                </td>
                <td colSpan="6">
                  <strong>Place Of Supply:</strong> {orderData?.place}
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <strong>City:</strong> {orderData?.city}
                </td>
                <td colSpan="6">
                  <strong>State:</strong> {orderData?.state}
                </td>
              </tr>
              <tr>
                <td colSpan="6">
                  <strong>GSTIN:</strong> {orderData?.customerBillToGST}
                </td>
                <td colSpan="6">
                  <strong>Date:</strong>{" "}
                  {new Date(orderData?.invoiceDate).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Product Details */}
          <table className="product-table">
            <thead>
              <tr>
                <th className="th-main">S.No</th>
                <th>Particulars</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Taxable Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{orderData?.productInfo?.name}</td>
                <td>{orderData?.quantity}</td>
                <td>{parseInt(orderData?.productInfo?.offer_price || 0)}</td>

                <td>
                  {orderData?.transactionType === "Pre-paid" ? "10%" : "-"}
                </td>
                <td>{parseInt(orderData?.productInfo?.offer_price || 0) * orderData?.quantity}</td>

                <td>{orderData?.taxExclusiveGross}</td>
              </tr>
            </tbody>
          </table>

          {/* GST & Totals */}
          <table className="invoice-table" >
            <tbody className="table-body">
              <tr>
                <td colSpan="6" className="td-right">
                  SGST:
                </td>
                <td colSpan="2">
                  {Number(orderData?.sgstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  CGST:
                </td>
                <td colSpan="2">
                  {" "}
                  {Number(orderData?.cgstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  IGST:
                </td>
                <td colSpan="2">
                  {Number(orderData?.igstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  UTGST:
                </td>
                <td colSpan="2">
                  {Number(orderData?.utgstTax || 0).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td colSpan="6" className="td-right">
                  {" "}
                  Total GST Amount:
                </td>
                <td colSpan="2">
                  {Number(orderData?.totalTaxAmount || 0).toFixed(2)}
                </td>
                {/* <td colSpan="2">
                       {(
                         Number(taxValues?.cgst || 0) +
                         Number(taxValues?.sgst || 0) +
                         Number(taxValues?.igst || 0) +
                         Number(taxValues?.utgst || 0)
                       ).toFixed(2)}
                     </td> */}
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  Delivery charge:
                </td>

                <td>{orderData?.productInfo?.delivery_charge}</td>
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  Roundoff:
                </td>
                <td colSpan="2">
                  {Number(orderData?.roundOff || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="td-right">
                  <strong>Total Invoice Amount:</strong>
                </td>
                <td colSpan="2">{Math.round(orderData?.invoiceAmount || 0)}</td>
              </tr>
            </tbody>
          </table>
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
