import React, { useEffect } from "react";
import CustomTable from "../../../components/table/Table";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../store/slice/orderSlice";

const order = () => {
  const orderSelector = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "AWB", dataIndex: "waybill" },
    { title: "Customer Name", dataIndex: "buyerName" },
    { title: "Payment Method", dataIndex: "payment_order_id" },
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
          onClick={() => handleEdit(record)}
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
    />
  );
};

export default order;
