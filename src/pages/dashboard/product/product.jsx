
import CustomTable from "../../../components/table/Table";
import { Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { show, productGetAll, deleteProductById, productEditById } from "../../../store/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
    const productselector = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const { id } = useParams();


    //product edit data useeffect 
    // useEffect(() => {
    //     dispatch(productEditById(id))
    // }, [])


    useEffect(() => {
        dispatch(productGetAll())
    }, [])

    //delete product
    const handleDelete = (record) => {
        dispatch(deleteProductById(record.id));
    };


    //prepopulate for Product moudle 


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
                    {/* <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => console.log("Delete", record)}
                    ></Button> */}
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
            data={productselector.productTableData.map((row) => ({
                ...row,
                key: row.id,
            }))}
        />
    );
};

export default Product;
