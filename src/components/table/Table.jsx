import { Input, Select, Table } from "antd";
import "./Table.css";
import { useState } from "react";
const { Option } = Select;

const CustomTable = ({
  columns,
  data,
  addButtonClick,
  showAddButton = true,
}) => {
  const [pageSize, setPageSize] = useState(10);

  const handleChange = (value) => {
    setPageSize(value);
    if (onChange) onChange(value);
  };

  // const handleChange = (value) => {
  //   setPageSize(value);
  // };

  const handleAdd = () => {
    addButtonClick({ newPage: true });
  };
  return (
    <div className="bg-white w-full my-shadow ">
      <div className="table-toolbar">
        <div className="toolbar-left">
          <span className="heading-2">Show</span>
          <Select
            value={pageSize}
            onChange={handleChange}
            className="toolbar-select"
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </div>

        <div className="toolbar-right">
          <Input placeholder="Search" className="toolbar-search" />
          {showAddButton && (
            <button className="primary-button font-medium" onClick={handleAdd}>
              + Add New
            </button>
          )}
        </div>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default CustomTable;
