import React from "react";
import { useState, useEffect } from "react";
import { Button, Select, Form, Input, Upload, message } from "antd";
import { ICategory, IProducts } from "../../Types";
import { useParams } from "react-router-dom";
import fetchData from "../../Api";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface IProps {
  onUpdate: (id: number, product: IProducts) => void;
  categories: ICategory[];
}

const UpdateProduct: any = (props: IProps) => {
  const [uploadFile, setUploadFile] = useState<string>("");
  const PRESET_NAME = "my_image";
  const FOLDER_NAME = "my_image";
  const CLOUD_NAME = "dl3q8klyg";
  const [productCurrent, setProductCurrent] = useState<any>({});
  useEffect(() => {
    fetchData({ method: "getOne", url: "/products", id: Number(id) }).then(
      (data) => setProductCurrent(data)
    );
  }, []);
  const { id } = useParams();
  const onFinish = (values: any) => {
    props.onUpdate(Number(id), {
      name: values.name,
      price: values.price,
      image: uploadFile || productCurrent.image,
      description: values.description,
      categoryId: values.categoryId,
    });
  };

  const handleUpdate = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      setUploadFile(info.file.response.secure_url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(
        `${info.file.name} [file upload failed](poe://www.poe.com/_api/key_phrase?phrase=file%20upload%20failed&prompt=Tell%20me%20more%20about%20file%20upload%20failed.).`
      );
    }
  };
  if (Object.keys(productCurrent).length !== 0) {
    return (
      <div>
        <h4 className="p-5">New Product</h4>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={productCurrent}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input price!" },
              {
                type: "number",
                message: "Please input a valid number!",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please input  image!" }]}
          >
            <Upload
              action={`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`}
              data={{ upload_preset: PRESET_NAME, folder: FOLDER_NAME }}
              listType="picture"
              accept=".jpg,.jpeg,.png"
              maxCount={1}
              onChange={(info) => handleUpdate(info)}
            >
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input  description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lựa chọn"
            name="categoryId"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select
              placeholder="Chọn Danh Mục"
              defaultValue={productCurrent.categoryId}
            >
              {props.categories.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default UpdateProduct;
