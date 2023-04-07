import React from "react";
import { useState, useEffect } from "react";
import { Space, Table, Button, Popconfirm, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { ICategory } from "../../Types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  categories: ICategory[];
  onRemove: (id: number) => void;
}

const AdminCategory = (props: IProps) => {
  const columns: ColumnsType<ICategory> = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
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
          <Button type="primary">
            <Link
              className="text-decoration-none"
              to={"/admin/category/update/" + record.id}
            >
              Update
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategoryList(
      props.categories.map((item): ICategory => {
        return {
          key: item.id,
          ...item,
        };
      })
    );
  }, [props.categories]);
  const handleSearch = (value: string) => {
    const newCategory = props.categories.filter((item) => {
      if (item.name.includes(value)) {
        return item;
      }
    });
    setCategoryList(
      newCategory.map((category): ICategory => {
        return {
          key: category.id,
          ...category,
        };
      })
    );
  };

  return (
    <>
      <Input.Search
        placeholder="Search"
        enterButton={<FontAwesomeIcon icon={faSearch} />}
        size="large"
        onSearch={(value) => handleSearch(value)}
      />
      <button className="btn btn-primary mt-5">
        <Link
          className="text-dicoration-none text-light"
          to={"/admin/category/add"}
        >
          New category
        </Link>
      </button>
      <Table className="my-5" columns={columns} dataSource={categoryList} />
    </>
  );
};

export default AdminCategory;
