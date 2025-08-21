import React, { useEffect, useState } from "react";
import {
  show,
  testimonialGetAll,
  deleteTestimonialById,
} from "../../store/slice/testimonailSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/table/Table";
import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Testimonial = () => {
  //   const useselector = useSelector((state) => state.com);
  const [newPage, setNewPage] = useState(false);

  const testimonialSelector = useSelector((state) => state.testimonial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(testimonialGetAll());
  }, []);

  const handleEdit = (record) => {
    navigate(`/dashboard/edit-testimonial/${record.id}`);
  };

  const handleDelete = (record) => {
    dispatch(deleteTestimonialById(record.id))
      .unwrap()
      .then(() => {
        toast.success("Testimonial row deleted successfully!");
        // refresh table
        dispatch(testimonialGetAll());
      })
      .catch((err) => {
        toast.error("Failed to delete testimonial row!");
        console.error("Delete failed:", err);
      });
  };

  // const data = [{name: "aaa", age:"bbb"}]
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Retting", dataIndex: "retting" },
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
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => console.log("Delete", record)}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      createUrl="edit-testimonial"
      data={testimonialSelector.testimonialTableData.map((row) => ({
        ...row,
        key: row.id, // or row._id, must be unique
      }))}
    />
  );
};

export default Testimonial;
