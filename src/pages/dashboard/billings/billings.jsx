import CustomTable from "../../../components/table/Table";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  billingsGetAll,
  ViewBillbyid,
} from "../../../store/slice/billingsSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const billings = () => {
  const billingsselector = useSelector((state) => state.billings);
  const dispatch = useDispatch();
  const { id } = useParams();
 

  useEffect(() => {
    dispatch(billingsGetAll());
  }, []);

  const navigate = useNavigate();

  const handleditbill = (record) => {
    dispatch(ViewBillbyid(record.id));
    navigate(`/dashboard/billings/view-bill/${record.id}`);
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: " Name", dataIndex: "name" },
    { title: "Invoice Amount", dataIndex: "invoiceAmount" },
    { title: "Address", dataIndex: "address" },
    { title: "City", dataIndex: "city" },
    { title: "State", dataIndex: "state" },
    { title: "Pin", dataIndex: "pin" },
    // { title: "Country", dataIndex: "country" },
    // { title: "Country", dataIndex: "country" },

    // { title: "Ordered Items", dataIndex: "ordered" },
    // { title: "actual_price", dataIndex: "actual_price" },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
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
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleditbill(record)}
          >
            view bill
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      createUrl="billings/view-bill"
      data={
        Array.isArray(billingsselector.billingsTableData)
          ? billingsselector.billingsTableData.map((item) => ({
              ...item,
              key: item.id, // 👈 unique key for AntD table
            }))
          : []
      }
    />
  );
};

export default billings;
