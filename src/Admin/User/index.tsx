import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { IUser } from "../../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  users: IUser[];
  onRemove: (id: string) => void;
  onAuthorize: (id: string) => void;
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="top"
              title=""
              description="Bạn có muốn xóa sản phẩm này ???"
              onConfirm={() => props.onRemove(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Remove
              </Button>
            </Popconfirm>
            {record.role == "member" && (
              <Popconfirm
                placement="top"
                title=""
                description="Bạn có muốn cấp quyền cho tài khoản này ???"
                onConfirm={() => props.onAuthorize(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Authorize</Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];
  const [listUser, setListUser] = useState<IUser[]>([]);
  useEffect(() => {
    setListUser(props.users);
  }, [props.users]);
  const handleSearch = (value: string) => {
    const newUser = props.users.filter((item) => {
      if (item.name.includes(value)) {
        console.log(item.email, value);
        return item;
      }
    });
    setListUser(newUser);
  };
  return (
    <>
      <Input.Search
        placeholder="Search"
        enterButton={<FontAwesomeIcon icon={faSearch} />}
        size="large"
        onSearch={(value) => handleSearch(value)}
      />
      <Table className="my-5" columns={columns} dataSource={listUser} />
    </>
  );
};

export default AdminUser;
