import { Input, Select } from "antd";
// import whatsappImage from './assets/whatsapp-bg.jpg';
import { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import CustomTable from "../../../components/table/Table";
const { Option } = Select;

const Detail = ({ BackButton }) => {
  const [pageSize, setPageSize] = useState(10);
  const [fileName, setFileName] = useState(10);
  const [jsonData, setJsonData] = useState(null);

  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Group",
      dataIndex: "Group",
      key: "Group",
    },
    // {
    //     title: "Message",
    //     dataIndex: "message",
    //     key: "message",
    // },
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
    setJsonData([]); // Reset JSON data before parsing

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      chunk: function (result) {
        setJsonData((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          ...result.data.map((item, index) => ({
            ...item,
            key: item.id || `csv-${Date.now()}-${index}`, // Ensure a unique key
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
    setJsonData([]); // Reset JSON data before parsing

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      let parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      parsedData = parsedData.map((item, index) => ({
        ...item,
        key: item.id || `excel-${Date.now()}-${index}`, // Assign unique key
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
    if (onChange) onChange(value);
  };
  const handleFileNameChange = (value) => {
    setFileName(value);
    if (onChange) onChange(value);
  };

  const handleAdd = () => {
    BackButton({ newPage: false });
  };

  return (
    <div className="">
      <div className="w-[71%]  bg-white my-shadow py-6 px-4">
        <div className="heading-2 mb-2">Broadcast Name</div>
        <Input placeholder="Name" className="inputBox !mb-4" />

        <div className="heading-2 mb-2">Select Broadcast Number</div>
        <Select
          value={pageSize}
          onChange={handleChange}
          style={{ width: "100%" }}
          dropdownStyle={{ minWidth: 60 }}
          className="!mb-4"
        >
          <Option value={10} disabled>
            select-account
          </Option>
          <Option value={20}>Purfull, +919098789098</Option>
          <Option value={25}>Madgix, +918890987656</Option>
        </Select>

        <div className="heading-2 mb-2">Select Contact List</div>
        <Select
          value={fileName}
          onChange={handleFileNameChange}
          style={{ width: "100%" }}
          dropdownStyle={{ minWidth: 60 }}
          className=""
        >
          <Option value={10} disabled>
            select-file
          </Option>
          <Option value={20}>my-list</Option>
          <Option value={25}>her-list</Option>
        </Select>
        <div className="py-4 flex items-center justify-between">
          <hr className="w-[45%] border-[#d9d9d9]" />
          <span className="text-[#3b4056] font-medium">or</span>
          <hr className="w-[45%] border-[#d9d9d9]" />
        </div>
        <div className="heading-2 mb-2">Upload Contact List</div>

        {/* Download Sample Button */}
        <button
          onClick={downloadSampleCSV}
          className="bg-[#6200ed] text-white py-2 px-4 rounded mb-4"
        >
          Download Sample CSV
        </button>

        {/* File Upload Input */}
        <input
          type="file"
          className="border p-2 w-full"
          accept=".csv, .xls, .xlsx"
          onChange={handleFileUpload}
        />

        {loading && (
          <p className="mt-4 text-blue-500">Processing file, please wait...</p>
        )}

        {/* {jsonData?.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 max-h-64 overflow-auto">
                    <h3 className="font-bold">JSON Output (Showing First 5 Rows):</h3>
                    <pre className="text-sm">{JSON.stringify(jsonData.slice(0, 5), null, 2)}</pre>
                </div>
            )} */}

        <CustomTable
          columns={columns}
          addButtonClick={handleAdd}
          data={jsonData}
        />
      </div>
      {/* <div className="my-shadow fixed right-6 top-23 w-[20%]">
                <img src={whatsappImage} className="my-shadow"  alt="" />
            </div> */}
      <div className="w-[20%] fixed right-6 bottom-6  py-3 flex justify-end">
        <button
          onClick={handleAdd}
          className="secondary-button font-medium mr-4 !px-[30px]"
        >
          Discard
        </button>
        <button onClick={handleAdd} className="primary-button font-medium ">
          Add Broadcast
        </button>
      </div>
    </div>
  );
};

export default Detail;
