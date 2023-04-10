import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link, Outlet } from "react-router-dom";
import { ICategory, IProducts } from "../../Types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSearch);

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
//   description: string;
// }

interface IProps {
  products: IProducts[];
  categories: ICategory[];
  onRemove: (id: string) => void;
}
const AdminProducts = (props: IProps): any => {
  const columns: ColumnsType<IProducts> = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imgUrl) => <img width={100} height={100} src={imgUrl} alt="" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) =>
        props.categories.find((item: ICategory) => item._id === categoryId)
          ?.name || "Chưa có danh mục",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            onConfirm={() => props.onRemove(record._id)}
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
              to={"/admin/products/update/" + record._id}
            >
              Update
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
  const [listProducts, setListProducts] = useState<IProducts[]>([]);
  useEffect(() => {
    setListProducts(props.products);
  }, [props.products]);
  const handleSearch = (value: string) => {
    const newProducts = props.products.filter((item) => {
      if (item.name.includes(value)) {
        return item;
      }
    });
    setListProducts(newProducts);
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
        <Link className="text-light" to={"/admin/products/add"}>
          New product
        </Link>
      </button>
      <Table className="my-5" columns={columns} dataSource={listProducts} />
    </>
  );
};

export default AdminProducts;
