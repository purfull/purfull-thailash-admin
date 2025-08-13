
import CustomTable from "../../../components/table/Table";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { show, productGetAll, productEditById } from "../../../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
    const productselector = useSelector((state) => state.product);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(productGetAll())
    })


    const navigate = useNavigate()
        const handleEdit = (record) => {
        navigate(`/dashboard/edit-product/${record.id}`);
      };
    const columns = [
        { title: "id", dataIndex: "id" },
        { title: "name", dataIndex: "name" },
        { title: "title", dataIndex: "title" },
        { title: "actual_price", dataIndex: "actual_price" },
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
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => console.log("Delete", record)}
                    ></Button>
                </Space>
            ),
        },
    ];

    return (
        <CustomTable
            columns={columns}
            data={productselector.productTableData.map((row) => ({
                ...row,
                key: row.id,
            }))}
        />
    );
};

export default Product;
