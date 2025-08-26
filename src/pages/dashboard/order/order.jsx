import React, { useEffect } from "react";
import CustomTable from "../../../components/table/Table";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../store/slice/orderSlice";
import { useNavigate } from "react-router-dom";

const order = () => {
  const orderSelector = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const handleView = (record) => {
    navigate(`/dashboard/order/view/${record.id}`);
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "Invoice Number", dataIndex: "invoiceNumber" },
    { title: "Customer Name", dataIndex: "buyerName" },
    { title: "Payment Method", dataIndex: "payment" },
    { title: "Refunded", dataIndex: "status" },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        if (!text) return "";
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          view
        </Button>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={(orderSelector?.orderTableData || []).map((row) => ({
        ...row,
        key: row.id, // or row._id, must be unique
      }))}
      showAddButton={false}
    />
  );
};

export default order;
