import React from "react";
import { Space, Table, Button } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import ComponentSearch from "../../Components/Search";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const AdminUser: React.FC = () => {
  return (
    <>
      <ComponentSearch />
      <Table className="my-5" columns={columns} dataSource={data} />
    </>
  );
};

export default AdminUser;
