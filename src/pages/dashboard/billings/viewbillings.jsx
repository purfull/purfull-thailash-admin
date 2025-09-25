import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

  const componentRef = useRef(null);

  const { selectedBill } = useSelector((state) => state.billings);

  const [viewLoad, setViewLoad] = useState(false);
  // const [selectedTaxTypes, setSelectedTaxTypes] = useState([]);
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
    roundOff: "",
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
        Array.isArray(selectedBill.data?.orderItems)
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
    const payload = {
      ...billingsdata,
      orderItems: items,
    cgstTax: taxValues.cgst ? Number(totalTaxable / 2).toFixed(2) : "",
    sgstTax: taxValues.sgst ? Number(totalTaxable / 2).toFixed(2) : "",
    igstTax: taxValues.igst ? Number(totalTaxable).toFixed(2) : "",
    utgstTax: taxValues.utgst ? Number(totalTaxable).toFixed(2) : "",

    };

    dispatch(CreateBill(payload))
  .unwrap() // unwraps the fulfilled/rejected action
  .then((res) => {
    const id = res?.data?.id; // adjust key based on API response
    if (id) {
      dispatch(ViewBillbyid(id));
    }
  })
  .catch((err) => {
    console.error("Error creating bill:", err);
  });

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

  // const handlePrint = useReactToPrint({
  //   contentRef: componentRef,
  // });

  // const onPrintClick = () => {
  //   console.log("Print clicked");
  //   handlePrint();
  // };

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

  // Handle Inputchange for tax types
  // Handle tax input change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
    
  //   setTaxValues((prev) => ({
  //     ...prev,
  //     [name]: Number(value) || 0, // store as number
  //   }));
  // };

  const handleInputChange = (e) => {
  const { name, type, checked, value } = e.target;
console.log(name, type, checked, value, totalTaxable, totalTaxable / 2);

  setTaxValues((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : Number(value) || 0,
  }));
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

    // const sgstTax = subtotal * (Number(taxValues.sgst) / 100);
    const sgstTax = totalTaxable / 2;
    const cgstTax = totalTaxable / 2;;
    const igstTax = subtotal * (Number(taxValues.igst) / 100);
    const utgstTax = subtotal * (Number(taxValues.utgst) / 100);

    // 3. Totals before round-off
    const totalTaxAmount = sgstTax + cgstTax + igstTax + utgstTax;
    const invoiceAmount = subtotal ;

    // 4. Round-off calculation
    const roundedInvoiceAmount = Math.round(invoiceAmount);
    const roundOff = (roundedInvoiceAmount - invoiceAmount).toFixed(2);

    // 5. Update billingsData with tax values
    setBillingsData((prev) => ({
      ...prev,
      taxExclusiveGross: subtotal.toFixed(2),
      sgstTax: sgstTax.toFixed(2),
      cgstTax: cgstTax.toFixed(2),
      igstTax: igstTax.toFixed(2),
      utgstTax: utgstTax.toFixed(2),
      totalTaxAmount: totalTaxAmount.toFixed(2),
      invoiceAmount: invoiceAmount.toFixed(2),
      roundOff: roundOff,
      finalInvoiceAmount: roundedInvoiceAmount.toFixed(2),
    }));
  }, [items, taxValues]);

  const styles = {
    invoiceContainer: {
      backgroundColor: "#fff",
      padding: "1rem",
      marginTop: "1rem",
    },
    invoiceHeader: {
      position: "relative",
      border: "1px solid #ccc",
      padding: "0.5rem",
      textAlign: "center",
    },
    invoiceContact: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      fontSize: "0.875rem",
      color: "#111",
      lineHeight: "1.4",
      margin: 0,
    },
    invoiceLogo: {
      maxWidth: "150px",
      margin: "0 auto",
      display: "block",
    },
    companyName: {
      fontSize: "1.125rem",
      fontWeight: "bold",
    },
    companyAddress: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    invoiceTable: {
      borderCollapse: "collapse",
      border: "1px solid #d1d5db",
      width: "100%",
      textAlign: "left",
    },
    invoiceCell: {
      border: "1px solid #d1d5db",
      padding: "0.5rem",
    },
    tdRight: {
      width: "77%",
      textAlign: "right",
    },
    tdBold: {
      fontWeight: "bold",
    },
  };

  // Desktop print (works reliably on desktop browsers)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice_${billingsdata?.invoiceNumber || "Draft"}`,
  });

  // const handlePrint = () => {
  //   console.log("print");
    
  // }
  // Mobile fallback → generate PDF directly
  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a5");
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

    pdf.save(`Invoice_${billingsdata?.invoiceNumber || "Draft"}.pdf`);
  };

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const totalTaxable = items.reduce((acc, item) => {
  const amount = item.quantity * item.rate - (item.discount || 0);
  const taxable = (amount - (amount / 105) * 100);
  return acc + taxable;
}, 0);


  return (
    <div className="view-order-title">
      <div className="view-name">View Bills</div>

      <Form layout="horizontal" className="order-form">
        <div className="view-billings-input-styles">
          <Form.Item label="Date" className="formOrder-heading">
            <Input
            type="date"
              name="invoiceDate"
              className="formOrder-input"
              value={billingsdata?.invoiceDate || ""}
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
          {/* <Form.Item label="Country" className="formOrder-heading">
            <Input
              name="country"
              className="formOrder-input"
              value={billingsdata?.country || ""}
              onChange={handleChange}
              // disabled
            />
          </Form.Item> */}
          <Form.Item label="Contact Number" className="formOrder-heading">
            <Input
              name="phone"
              type="number"
              className="formOrder-input"
              value={billingsdata?.phone || ""}
              onChange={handleChange}
              // disabled
            />
          </Form.Item>
          {/* <Form.Item label="Place Of Supply" className="formOrder-heading">
            <Input
              name="address"
              className="formOrder-input"
              value={billingsdata?.address || ""}
              onChange={handleChange}
              // disabled
            />
          </Form.Item> */}

          {/* <Form.Item label="Invoice Amount" className="formOrder-heading">
            <Input
              name="invoiceAmount"
              className="formOrder-input"
              value={billingsdata?.invoiceAmount || ""}
              onChange={handleChange}
              // disabled
            />
          </Form.Item> */}
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
            <legend className="tax-legend">Enter Tax Values</legend>
            <div className="tax-inputs">
              <label className="tax-label">
                SGST:
                <input
                  type="checkbox"
                  name="sgst"
                  // value={taxValues.sgst || ""}
                  // value={billingsdata?.sgstTax || ""}
                  onChange={handleInputChange}
                  placeholder="Enter SGST %"
                  className="item-input-tax"
                />
              </label>

              <label className="tax-label">
                CGST:
                <input
                  type="checkbox"
                  name="cgst"
                  // value={billingsdata?.cgstTax || ""}
                  onChange={handleInputChange}
                  placeholder="Enter CGST %"
                />
              </label>

              <label className="tax-label">
                IGST:
                <input
                  type="checkbox"
                  name="igst"
                  // value={billingsdata?.igstTax || ""}
                  onChange={handleInputChange}
                  placeholder="Enter IGST %"
                />
              </label>

              <label className="tax-label">
                UTGST:
                <input
                  type="checkbox"
                  name="utgst"
                  // value={billingsdata?.utgstTax || ""}
                  onChange={handleInputChange}
                  placeholder="Enter UTGST %"
                />
              </label>
            </div>
          </div>
        </div>
      </Form>

      {/* <div ref={componentRef} className="invoice-container">
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
          <tbody className="table-body">
            {items.map((item, index) => {
              const amount = item.quantity * item.rate - (item.discount || 0);
              const taxable = amount - amount * 0.12; // adjust if tax is applied separately
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

       
        <table className="invoice-table">
          <tbody className="table-body">
            <tr>
              <td colSpan="6" className="td-right">
                SGST:
              </td>
              <td colSpan="2">
                {Number(billingsdata?.sgstTax || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                CGST:
              </td>
              <td colSpan="2">
                {" "}
                {Number(billingsdata?.cgstTax || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                IGST:
              </td>
              <td colSpan="2">
                {Number(billingsdata?.igstTax || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                UTGST:
              </td>
              <td colSpan="2">
                {Number(billingsdata?.utgstTax || 0).toFixed(2)}
              </td>
            </tr>

            <tr>
              <td colSpan="6" className="td-right">
                {" "}
                Total GST Amount:
              </td>
              <td colSpan="2">
                {Number(billingsdata?.taxExclusiveGross * 0.12 || 0).toFixed(2)}
              </td>
             
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                Roundoff:
              </td>
              <td colSpan="2">
                {Number(billingsdata?.roundOff || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="td-right">
                <strong>Total Invoice Amount:</strong>
              </td>
              <td colSpan="2">
                {Math.round(billingsdata?.invoiceAmount || 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div
        ref={componentRef}
        style={styles.invoiceContainer}
        className="invoice-container"
      >
        {/* Header */}
        <div style={styles.invoiceHeader} className="invoice-header">
          <p style={styles.invoiceContact} className="invoice-contact">
            Cell: 9597266083 <br /> 9003857938
          </p>
          <img
            alt="Thailash Logo"
            src={ThailashLogo}
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
        <table style={styles.invoiceTable} className="invoice-table">
          <tbody className="table-body">
            <tr>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Invoice Number:</strong>{" "}
                {String(billingsdata?.id ?? "").padStart(4, "0")}
              </td>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Invoice Date:</strong>{billingsdata?.invoiceDate
    ? new Date(billingsdata.invoiceDate).toLocaleDateString("en-GB")
    : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Customer Name:</strong> {billingsdata?.name}
              </td>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Contact Number:</strong> {billingsdata?.phone}
              </td>
            </tr>
            <tr>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Billing Address:</strong> {billingsdata?.address}
              </td>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>Place Of Supply:</strong> {billingsdata?.place}
              </td>
            </tr>
            <tr>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>City:</strong> {billingsdata?.city}
              </td>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>State:</strong> {billingsdata?.state}
              </td>
            </tr>
            <tr>
              <td colSpan="6" style={styles.invoiceCell}>
                <strong>GSTIN:</strong> {billingsdata?.customerBillToGST}
              </td>
              {/* <td colSpan="6" style={styles.invoiceCell}>
                <strong>Date:</strong>{" "}
                {new Date(billingsdata?.invoiceDate).toLocaleDateString()}
              </td> */}
            </tr>
          </tbody>
        </table>

        {/* Product Details */}
        <table style={styles.invoiceTable} className="product-table">
          <thead>
            <tr>
              <th style={styles.invoiceCell}>S.No</th>
              <th style={styles.invoiceCell}>Particulars</th>
              <th style={styles.invoiceCell}>Quantity</th>
              <th style={styles.invoiceCell}>Rate</th>
              <th style={styles.invoiceCell}>Discount</th>
              <th style={styles.invoiceCell}>Amount</th>
              <th style={styles.invoiceCell}>Taxable Amount</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {items.map((item, index) => {
              const amount = item.quantity * item.rate - (item.discount || 0);
              const taxable = (amount / 105) * 100;
              return (
                <tr key={index}>
                  <td style={styles.invoiceCell}>{index + 1}</td>
                  <td style={styles.invoiceCell}>{item.product}</td>
                  <td style={styles.invoiceCell}>{item.quantity}</td>
                  <td style={styles.invoiceCell}>{item.rate}</td>
                  <td style={styles.invoiceCell}>{item.discount}</td>
                  <td style={styles.invoiceCell}>{amount.toFixed(2)}</td>
                  <td style={styles.invoiceCell}>{taxable.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* GST & Totals */}
        <table style={styles.invoiceTable} className="invoice-table">
          <tbody className="table-body">
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                SGST:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {/* {Number(billingsdata?.sgstTax || 0).toFixed(2)} */}
                {taxValues.sgst ? Number(totalTaxable / 2).toFixed(2) : 0}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                CGST:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {taxValues.cgst ? Number(totalTaxable / 2).toFixed(2) : 0}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                IGST:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {taxValues.igst ? Number(totalTaxable).toFixed(2) : 0}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                UTGST:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {taxValues.utgst ? Number(totalTaxable).toFixed(2) : 0}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                Total GST Amount:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {totalTaxable.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                Roundoff:
              </td>
              <td colSpan="2" style={styles.invoiceCell}>
                {Number(billingsdata?.roundOff || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td
                colSpan="6"
                style={{ ...styles.invoiceCell, ...styles.tdRight }}
              >
                <strong>Total Invoice Amount:</strong>
              </td>
              <td
                colSpan="2"
                style={{ ...styles.invoiceCell, ...styles.tdBold }}
              >
                {Math.round(billingsdata?.invoiceAmount || 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download & Action Buttons */}
      {/* <div style={styles.downloadButton}>
        <button
          type="button"
          style={styles.downloadInvoice}
          disabled={!billingsdata?.id}
          onClick={onPrintClick}
        >
          Download Invoice
        </button>
      </div> */}

      {/* Single Button → behaves differently based on device */}
      <div className="download-button">
        <button
          type="button"
          className="download-invoice"
          disabled={!billingsdata?.id}
          onClick={isMobile ? handleDownloadPDF : handlePrint}
        >
          {isMobile ? "Download Invoice" : " Download Invoice"}
        </button>
      </div>
      {/* <div className="download-button">
        <button
          type="button"
          className="download-invoice"
          disabled={billingsdata?.id ? false : true}
          onClick={onPrintClick}
        >
          Download Invoice
        </button>
      </div> */}

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
