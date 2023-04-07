import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { IUser } from "../../Types";

interface IProps {
  users: IUser[];
  onRemove: (id: number) => void;
}

const AdminUser = (props: IProps) => {
  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (link) => <img width={100} height={100} src={link} alt="" />,
    // },
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
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            placement="top"
            title=""
            description="Bạn có muốn xóa sản phẩm này ???"
            onConfirm={() => props.onRemove(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Remove
            </Button>
          </Popconfirm>
          {/* <Button type="primary">
            <Link className="text-decoration-none" to={"/"}>
              Update
            </Link>
          </Button> */}
        </Space>
      ),
    },
  ];
  const [listUser, setListUser] = useState<IUser[]>([]);
  useEffect(() => {
    console.log(props.users);
    setListUser(
      props.users.map((item: IUser) => {
        return {
          key: item.id,
          ...item,
        };
      })
    );
  }, [props.users]);
  return (
    <>
      <Table className="my-5" columns={columns} dataSource={listUser} />
    </>
  );
};

export default AdminUser;
