import { Input, Select } from "antd";
import { useState } from "react";
// import Papa from "papaparse";
// import * as XLSX from "xlsx";
import CustomTable from "../../../components/table/Table";
import "./Template.css";

const { Option } = Select;

const Template = ({ BackButton }) => {
  const [pageSize, setPageSize] = useState(10);
  const [fileName, setFileName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
    { title: "Group", dataIndex: "Group", key: "Group" },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.name.split(".").pop().toLowerCase();
    if (fileType === "csv") {
      parseCSV(file);
    } else if (fileType === "xls" || fileType === "xlsx") {
      parseExcel(file);
    } else {
      alert("Unsupported file format! Please upload a CSV or Excel file.");
    }
  };

  const parseCSV = (file) => {
    setLoading(true);
    setJsonData([]);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      chunk: function (result) {
        setJsonData((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          ...result.data.map((item, index) => ({
            ...item,
            key: item.id || `csv-${Date.now()}-${index}`,
          })),
        ]);
      },
      complete: () => {
        setLoading(false);
        console.log("CSV parsing complete.");
      },
    });
  };

  const parseExcel = (file) => {
    setLoading(true);
    setJsonData([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      parsedData = parsedData.map((item, index) => ({
        ...item,
        key: item.id || `excel-${Date.now()}-${index}`,
      }));
      setJsonData(parsedData);
      setLoading(false);
      console.log("Excel parsing complete.");
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ["Name", "Phone", "Group"],
      ["John Doe", "+1234567890", "A"],
      ["Jane Smith", "+9876543210", "B"],
    ];
    const csvContent = Papa.unparse(sampleData);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (value) => {
    setPageSize(value);
  };

  const handleFileNameChange = (value) => {
    setFileName(value);
  };

  const handleAdd = () => {
    BackButton({ newPage: false });
  };

  return (
    <div className="template-wrapper">
      <div className="template-box">
        <div className="template-heading">Template Name</div>
        <Input placeholder="Name" className="template-input" />

        <div className="template-heading">Title</div>
        <Input placeholder="Title" className="template-input" />

        <div className="template-heading">Body</div>
        <Input.TextArea placeholder="Message" className="template-textarea" />

        <div className="template-heading">Footer</div>
        <Input placeholder="Footer" className="template-input" />

        <div className="template-heading">Buttons</div>
        <Select
          value={pageSize}
          onChange={handleChange}
          className="template-select"
          dropdownStyle={{ minWidth: 60 }}
        >
          <Option value={10}>Call to Action</Option>
          <Option value={20}>Quick Reply</Option>
        </Select>
      </div>

      <div className="template-buttons">
        <button onClick={handleAdd} className="secondary-button">
          Discard
        </button>
        <button onClick={handleAdd} className="primary-button">
          Save Template
        </button>
      </div>
    </div>
  );
};

export default Template;
