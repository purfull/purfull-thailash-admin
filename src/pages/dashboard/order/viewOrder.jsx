import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin, Row, Col, Button } from "antd";
import { getAllProduct, updateOrder } from "../../../store/slice/orderSlice";
import "./viewOrder.css";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  // const handlePrint = useReactToPrint({
  //   contentRef: componentRef,
  // });
  // Desktop print (works reliably on desktop browsers)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${orderData?.invoiceNumber || "Draft"}`,
  });

  // Mobile fallback → generate PDF directly
  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add more pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`Invoice_${orderData?.invoiceNumber || "Draft"}.pdf`);
  };

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const styles = {
    invoiceContainer: {
      backgroundColor: "#fff",
      padding: "20px",
      marginTop: "20px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif",
      color: "#111",
    },
    invoiceHeader: {
      position: "relative",
      borderBottom: "1px solid #ccc",
      paddingBottom: "10px",
      marginBottom: "20px",
      textAlign: "center",
    },
    invoiceContact: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "12px",
      color: "#111",
      lineHeight: "1.4",
      margin: 0,
    },
    invoiceLogo: {
      maxWidth: "120px",
      margin: "0 auto",
      display: "block",
    },
    companyName: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "10px",
    },
    companyAddress: {
      fontSize: "13px",
      color: "#6b7280",
    },
    section: {
      marginBottom: "20px",
    },
    table: {
      borderCollapse: "collapse",
      width: "100%",
      border: "1px solid #d1d5db",
      marginTop: "10px",
      fontSize: "13px",
    },
    th: {
      border: "1px solid #d1d5db",
      padding: "6px",
      backgroundColor: "#f3f4f6",
      textAlign: "left",
    },
    td: {
      border: "1px solid #d1d5db",
      padding: "6px",
    },
    tdRight: {
      textAlign: "right",
    },
    tdLeft: {
      textAlign: "left",
    },
    tdBold: {
      fontWeight: "bold",
    },
    totalRow: {
      backgroundColor: "#f9fafb",
    },
    button: {
      marginTop: "15px",
      padding: "10px 20px",
      backgroundColor: "#046e3d",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

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
        <div
          ref={componentRef}
          style={styles.invoiceContainer}
          className="invoice-container"
        >
          <div style={styles.invoiceHeader} className="invoice-header">
            {/* <p className="invoice-contact"> */}
            <p style={styles.invoiceContact} className="invoice-contact">
              Cell: 9597266083 <br /> 9003857938
            </p>
            <img
              alt="Thailash Logo"
              src={thailashlogo}
              style={styles.invoiceLogo}
            />
            <p style={styles.companyName} className="company-name">
              THAILASH ORIGINAL THENNAMARAKUDI OIL
            </p>
            <p style={styles.companyAddress} className="company-address">
              3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br />
              Nagapattinam - 611 104
            </p>
          </div>

          {/* Customer & Invoice Details */}
          <table style={styles.table} className="invoice-table">
            <tbody className="table-body">
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Invoice Number:</strong>{" "}
                  {String(orderData?.invoiceNumber ?? "").padStart(4, "0")}
                </td>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Invoice Date:</strong> {orderData?.invoiceDate}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Customer Name:</strong> {orderData?.name}
                </td>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Contact Number:</strong> {orderData?.phone}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Billing Address:</strong> {orderData?.address}
                </td>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Place Of Supply:</strong> {orderData?.place}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>City:</strong> {orderData?.city}
                </td>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>State:</strong> {orderData?.state}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>GSTIN:</strong> {orderData?.customerBillToGST}
                </td>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdLeft }}>
                  <strong>Date:</strong>{" "}
                  {new Date(orderData?.invoiceDate).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Product Details */}
          <table style={styles.table} className="product-table">
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>Particulars</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Rate</th>
                <th style={styles.th}>Discount</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Taxable Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>1</td>
                <td style={styles.td}>{orderData?.productInfo?.name}</td>
                <td style={styles.td}>{orderData?.quantity}</td>
                <td style={styles.td}>
                  {parseInt(orderData?.productInfo?.offer_price || 0)}
                </td>

                <td style={styles.td}>
                  {orderData?.transactionType === "Pre-paid" ? "10%" : "-"}
                </td>
                <td style={styles.td}>
                  {parseInt(orderData?.productInfo?.offer_price || 0) *
                    orderData?.quantity}
                </td>

                <td style={styles.td}>{orderData?.taxExclusiveGross}</td>
              </tr>
            </tbody>
          </table>

          {/* GST & Totals */}
          <table style={styles.table} className="invoice-table">
            <tbody className="table-body">
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  SGST:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {Number(orderData?.sgstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  CGST:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {" "}
                  {Number(orderData?.cgstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  IGST:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {Number(orderData?.igstTax || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  UTGST:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {Number(orderData?.utgstTax || 0).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  {" "}
                  Total GST Amount:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
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
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  Delivery charge:
                </td>

                <td style={{ ...styles.td, ...styles.tdRight }}>
                  {orderData?.productInfo?.delivery_charge}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  Roundoff:
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {Number(orderData?.roundOff || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.td, ...styles.tdRight }}>
                  <strong>Total Invoice Amount:</strong>
                </td>
                <td colSpan="2" style={{ ...styles.td, ...styles.tdRight }}>
                  {Math.round(orderData?.invoiceAmount || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="order-invoice-container">
        <button
          type="button"
          onClick={handlePrint}
          className="order-download-button"
        >
          Download Invoice
        </button>
      </div> */}
      <div className="download-button">
        <button
          type="button"
          className="download-invoice"
          disabled={!orderData?.id}
          onClick={isMobile ? handleDownloadPDF : handlePrint}
        >
          {isMobile ? "Download Invoice" : " Download Invoice"}
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
