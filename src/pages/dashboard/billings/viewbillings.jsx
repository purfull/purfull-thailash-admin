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
import ThailashLogo from "../billings/assets/logo.svg";

const ViewBillings = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBill } = useSelector((state) => state.billings);

  const [viewLoad, setViewLoad] = useState(false);
  const [selectedTaxTypes, setSelectedTaxTypes] = useState([]);

  const [billingsdata, setBillingsData] = useState({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    // customerName: "",
    contactnum: "",
    billing: "",
    place: "",
    city: "",
    state: "",
    gst: "",
    address: "",
    phone: "",
    name: "",
    pin: "",
    order: "",
    country: "",
    quantity: "",
    sku: "",
    invoiceAmount: "",
    taxExclusiveGross: "",
    totalTaxAmount: "",
    buyerName: "",
    total_product_cost: "",
    cgstTax: "",
    sgstTax: "",
    igstTax: "",
    utgstTax: "",
    customerBillToGST: "",
  });

  const [items, setItems] = useState([
    { id: 1, product: "", quantity: "", rate: "", discount: "" },
  ]);
  console.log("Items", items);

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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: () => componentRef.current,
    documentTitle: `Invoice-${billingsdata?.invoiceNumber || "Draft"}`,
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

  //for adding or removing items

  let count = 1;
  const addNewItem = () => {
    setItems([
      ...items,
      { id: ++count, product: "", quantity: "", rate: "", discount: "" },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);

    setItems(updatedItems);
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

        {/* <Form.Item label="Particulars" className="formOrder-heading">
          <Input
            name="particulars"
            className="formOrder-input"
            value={billingsdata?.particulars || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item>
        <Form.Item label="Rate" className="formOrder-heading">
          <Input
            name="rate"
            className="formOrder-input"
            value={billingsdata?.rate || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item> */}

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

        <div className="item-buttons">
          <button onClick={addNewItem} disabled={viewLoad} className="add-btn">
            +
          </button>

          {items.length > 1 && (
            <button
              onClick={() => removeItem(items.length - 1)}
              disabled={viewLoad}
              className="remove-btn"
            >
              −
            </button>
          )}
        </div>
        <div className="items-container">
          {items.map((item, index) => (
            <div key={index} className="item-card">
              {[
                { label: "Particulars", id: "product" },
                { label: "Quantity", id: "quantity" },
                { label: "Rate", id: "rate" },
                { label: "Discount", id: "discount" },
              ].map(({ label, id }) => (
                <div key={id} className="item-field">
                  <label htmlFor={`${id}-${index}`} className="item-label">
                    {label}
                  </label>

                  <input
                    disabled={viewLoad}
                    id={`${id}-${index}`}
                    type="text"
                    value={item[id]}
                    onChange={(e) =>
                      handleItemChange(index, id, e.target.value)
                    }
                    className="item-input"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

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
        <div className="tax-container">
          <div className="tax-inner">
            <legend className="tax-legend">Select Tax Types</legend>
            <div className="tax-options">
              <div className="tax-option">
                <input
                  disabled={viewLoad}
                  type="checkbox"
                  id="sgst"
                  value="sgst"
                  checked={selectedTaxTypes.includes("sgst")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setSelectedTaxTypes([...selectedTaxTypes, value]);
                    } else {
                      setSelectedTaxTypes(
                        selectedTaxTypes.filter((type) => type !== value)
                      );
                    }
                  }}
                />
                <label htmlFor="sgst">SGST</label>
              </div>

              <div className="tax-option">
                <input
                  disabled={viewLoad}
                  type="checkbox"
                  id="cgst"
                  value="cgst"
                  checked={selectedTaxTypes.includes("cgst")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setSelectedTaxTypes([...selectedTaxTypes, value]);
                    } else {
                      setSelectedTaxTypes(
                        selectedTaxTypes.filter((type) => type !== value)
                      );
                    }
                  }}
                />
                <label htmlFor="cgst">CGST</label>
              </div>

              <div className="tax-option">
                <input
                  disabled={viewLoad}
                  type="checkbox"
                  id="igst"
                  value="igst"
                  checked={selectedTaxTypes.includes("igst")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setSelectedTaxTypes([...selectedTaxTypes, value]);
                    } else {
                      setSelectedTaxTypes(
                        selectedTaxTypes.filter((type) => type !== value)
                      );
                    }
                  }}
                />
                <label htmlFor="igst">IGST</label>
              </div>

              <div className="tax-option">
                <input
                  disabled={viewLoad}
                  type="checkbox"
                  id="utgst"
                  value="utgst"
                  checked={selectedTaxTypes.includes("utgst")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      setSelectedTaxTypes([...selectedTaxTypes, value]);
                    } else {
                      setSelectedTaxTypes(
                        selectedTaxTypes.filter((type) => type !== value)
                      );
                    }
                  }}
                />
                <label htmlFor="utgst">UTGST</label>
              </div>
            </div>
          </div>
        </div>
      </Form>

      <div ref={componentRef} className="invoice-container">
        <div className="invoice-header">
          <p className="invoice-contact">
            Cell: 9597266083 <br /> 9003857938
          </p>
          <img alt="Thailash Logo" src={ThailashLogo} />
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
                {String(billingsdata?.invoiceNumber ?? "").padStart(4, "0")}
              </td>
              <td colSpan="6">
                <strong>Invoice Date:</strong> {billingsdata?.invoiceDate}
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <strong>Customer Name:</strong> {billingsdata?.name}
              </td>
              <td colSpan="6">
                <strong>Contact Number:</strong> {billingsdata?.phone}
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <strong>Billing Address:</strong> {billingsdata?.address}
              </td>
              <td colSpan="6">
                <strong>Place Of Supply:</strong> {billingsdata?.place}
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <strong>City:</strong> {billingsdata?.city}
              </td>
              <td colSpan="6">
                <strong>State:</strong> {billingsdata?.state}
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <strong>GSTIN:</strong> {billingsdata?.customerBillToGST}
              </td>
              <td colSpan="6">
                <strong>Date:</strong>{" "}
                {new Date(billingsdata?.invoiceDate).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Product Details */}
        <table className="product-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Particulars</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Taxable Amount</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {items.map((item, index) => {
              const amount = item.quantity * item.rate - (item.discount || 0);
              const taxable = amount; // adjust if tax is applied separately
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.discount}</td>
                  <td>{amount.toFixed(2)}</td>
                  <td>{taxable.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* GST & Totals */}
        <table className="invoice-table" style={{ marginTop: "1rem" }}>
          <tbody className="table-body">
            <tr>
              <td colSpan="6" className="td-right">
                SGST:
              </td>
              <td colSpan="2">{billingsdata?.sgstTax || 0}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                CGST:
              </td>
              <td colSpan="2">{billingsdata?.cgstTax || 0}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                IGST:
              </td>
              <td colSpan="2">{billingsdata?.igstTax || 0}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                UTGST:
              </td>
              <td colSpan="2">{billingsdata?.utgstTax || 0}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                <strong>Total Invoice Amount:</strong>
              </td>
              <td colSpan="2">
                <strong>{billingsdata?.invoiceAmount || 0}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        className="download-invoice"
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
