import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import {
  ViewBillbyid,
  CreateBill,
  // updateBill,
} from "../../../store/slice/billingsSlice";
import "./billings.css";
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

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: () => componentRef.current,
    // pageStyle: `
    //   @page {
    //     size: auto;
    //     margin: 20mm;
    //   }
    //   body {
    //     font-family: sans-serif;
    //     -webkit-print-color-adjust: exact;
    //     print-color-adjust: exact;
    //   }
    // `,
  });

  //print
  const onPrintClick = () => {
    console.log("Print clicked");
    handlePrint(); // Skip image loading check for test
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

      <div ref={componentRef} className="invoice-container">
        <div className="invoice-header">
          <p className="invoice-contact">
            Cell: 9597266083 <br /> 9003857938
          </p>
          <img alt="Thailash Logo" />
          <p className="company-name">THAILASH ORIGINAL THENNAMARAKUDI OIL</p>
          <p className="company-address">
            3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br />
            Nagapattinam - 611 104
          </p>
        </div>

        {/* Invoice Details Table */}
        <table className="invoice-table">
          <tbody>
            <tr>
              <td colSpan="6">
                <strong>Invoice Number:</strong>{" "}
                {String(billingsdata?.invoiceNumber ?? "").padStart(4, "0")}
              </td>
              <td colSpan="6">
                <strong>Invoice Date:</strong> {billingsdata?.invoiceDate}
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <strong>Customer Name:</strong> {billingsdata.customerName}
              </td>
              <td colSpan="6">
                <strong>Contact Number:</strong> {billingsdata.contactnum}
              </td>
            </tr>
            {/* ...repeat for other rows */}
          </tbody>
        </table>

        {/* GST Table */}
        <table className="invoice-table" style={{ marginTop: "1rem" }}>
          <tbody>
            <tr>
              <td colSpan="6" className="td-right">
                SGST:
              </td>
              <td colSpan="2">sgstTax</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                CGST:
              </td>
              <td colSpan="2">cgstTax</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right td-bold">
                Total Invoice Amount
              </td>
              {/* <td colSpan="2" className="td-bold">
                {finalInvoiceAmount.toFixed(2)}
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>

      <button
        disabled={billingsdata?.invoiceNumber ? false : true}
        onClick={onPrintClick}
      >
        Download Invoice
      </button>

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
