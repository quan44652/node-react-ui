import React from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import ComponentSearch from "../../Components/Search";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Image",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 500,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" danger>
          Remove
        </Button>
        <Button type="primary">
          <Link className="text-decoration-none" to={"/"}>
            Update
          </Link>
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    description:
      "Coordinating the selection of provinces and cities is a common use case and demonstrates how selection can be coordinated.Using the Cascader component is strongly recommended instead as it is more flexible and capable.Coordinating the selection of provinces and cities is a common use case and demonstrates how selection can be coordinated.Using the Cascader component is strongly recommended instead as it is more flexible and capable.",
  },
];

const AdminProducts: React.FC = () => {
  return (
    <>
      <ComponentSearch />
      <Table className="my-5" columns={columns} dataSource={data} />
    </>
  );
};

export default AdminProducts;
