
import CustomTable from "../../../components/table/Table";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined ,EyeOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import { customerGetAll } from "../../../store/slice/customerSlice";



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Customer = () => {
    const customerselector = useSelector((state) => state.customer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(customerGetAll())
    },[])



    // const navigate = useNavigate()
    //     const handleEdit = (record) => {
    //     navigate(`/dashboard/edit-product/${record.id}`);
    //   };

    const columns = [
        { title: "id", dataIndex: "id" },
        { title: "first name", dataIndex: "first_name" },
        { title: "lastname", dataIndex: "last_name" },
        { title: "City", dataIndex: "city" },

        // { title: "title", dataIndex: "title" },
        // { title: "actual_price", dataIndex: "actual_price" },
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
        
                    <Button type="primary"
                        icon={<EyeOutlined  />}
                        onClick={() => handleEdit(record)}>view</Button>
                </Space>
            ),
        },
    ];

    return (
        <CustomTable
            columns={columns}
            data={customerselector.customerTableData.map((row) => ({
                ...row,
                key: row.id,
            }))}
        />
    );

};

export default Customer;
