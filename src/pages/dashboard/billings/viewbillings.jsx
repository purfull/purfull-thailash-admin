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
  const [taxValues, setTaxValues] = useState({
    cgst: 0,
    sgst: 0,
    igst: 0,
    utgst: 0,
  });

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

      if (
        selectedBill.data?.orderItems &&
        Array.isArray(selectedBill.data.orderItems)
      ) {
        setItems(
          selectedBill.data.orderItems.map((item) => ({
            id: item.id,
            product: item.product || "",
            quantity: item.quantity || "",
            rate: item.rate || "",
            discount: item.discount || "",
          }))
        );
      }
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
    content: () => componentRef.current,
    documentTitle: `Invoice-${billingsdata?.invoiceNumber || "Draft"}`,
  });
  //print
  const onPrintClick = () => {
    console.log("Print clicked");
    handlePrint();
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

  // Handle checkbox change for tax types
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedTaxTypes((prev) => {
      if (checked) {
        // Add tax type if checked
        return [...prev, value];
      } else {
        // Remove tax type if unchecked
        return prev.filter((type) => type !== value);
      }
    });
  };

  useEffect(() => {
    if (!items || items.length === 0) return;

    // 1. Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.rate) || 0;
      const discount = Number(item.discount) || 0;
      return sum + (qty * rate - discount);
    }, 0);

    // 2. Initialize tax values
    let sgstTax = 0,
      cgstTax = 0,
      igstTax = 0,
      utgstTax = 0;

    // 3. Apply taxes based on checkbox selection
    if (selectedTaxTypes.includes("sgst")) sgstTax = subtotal * 0.06;
    if (selectedTaxTypes.includes("cgst")) cgstTax = subtotal * 0.06;
    if (selectedTaxTypes.includes("igst")) igstTax = subtotal * 0.12;
    if (selectedTaxTypes.includes("utgst")) utgstTax = subtotal * 0.12;

    const totalTaxAmount =
      taxValues.cgst + taxValues.sgst + taxValues.igst + taxValues.utgst;
    const invoiceAmount = subtotal + totalTaxAmount;

    // 4. Update billingsData with tax values
    setBillingsData((prev) => ({
      ...prev,
      taxExclusiveGross: subtotal.toFixed(2),
      sgstTax: sgstTax.toFixed(2),
      cgstTax: cgstTax.toFixed(2),
      igstTax: igstTax.toFixed(2),
      utgstTax: utgstTax.toFixed(2),
      totalTaxAmount: totalTaxAmount.toFixed(2),
      invoiceAmount: invoiceAmount.toFixed(2),
    }));
  }, [items, selectedTaxTypes]);

  return (
    <div className="view-order-title">
      <div className="view-name">View Bills</div>

      <Form layout="horizontal" className="order-form">
        <div className="view-billings-input-styles">
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
        </div>
        {/* <Form.Item label="Payment Method" className="formOrder-heading">
          <Input
            name="payment"
            className="formOrder-input"
            value={billingsdata?.payment || ""}
            onChange={handleChange}
            // disabled
          />
        </Form.Item> */}
        {/* <Form.Item label="Created At" className="formOrder-heading">
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
        </Form.Item> */}

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
            <div className="tax-checkbox">
              <input
                type="checkbox"
                value="sgst"
                checked={selectedTaxTypes.includes("sgst")}
                onChange={handleCheckboxChange}
              />
              <label>SGST</label>

              <input
                type="checkbox"
                value="cgst"
                checked={selectedTaxTypes.includes("cgst")}
                onChange={handleCheckboxChange}
              />
              <label>CGST</label>

              <input
                type="checkbox"
                value="igst"
                checked={selectedTaxTypes.includes("igst")}
                onChange={handleCheckboxChange}
              />
              <label>IGST</label>

              <input
                type="checkbox"
                value="utgst"
                checked={selectedTaxTypes.includes("utgst")}
                onChange={handleCheckboxChange}
              />
              <label>UTGST</label>
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
              <td colSpan="2">{Number(taxValues?.sgst || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                CGST:
              </td>
              <td colSpan="2"> {Number(taxValues?.cgst || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                IGST:
              </td>
              <td colSpan="2">{Number(taxValues?.igst || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                UTGST:
              </td>
              <td colSpan="2">{Number(taxValues?.utgst || 0).toFixed(2)}</td>
            </tr>

            <tr>
              <td colSpan="6" className="td-right">
                {" "}
                Total GST Amount:
              </td>
              {/* <td colSpan="2">{totalTaxAmount.toFixed(2)}</td> */}
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
                Roundoff:
              </td>
              <td colSpan="2">{Number(taxValues?.roundOff || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                <strong>Total Invoice Amount:</strong>
              </td>
              <td colSpan="2">
                {/* <strong>{invoiceAmount.toFixed(2)}</strong> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="download-button">
        <button
          type="button"
          className="download-invoice"
          disabled={billingsdata?.invoiceNumber ? false : true}
          onClick={() => onPrintClick()}
        >
          Download Invoice
        </button>
      </div>

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
