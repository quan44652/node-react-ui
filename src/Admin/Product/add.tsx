import React from "react";
import { Button, Select, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddProduct: React.FC = () => (
  <div>
    <h4 className="p-5">New Product</h4>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
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
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please input  image!" }]}
      >
        <Input />
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
        <Select placeholder="Chọn Danh Mục">
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
          <Select.Option value="option3">Option 3</Select.Option>
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

export default AddProduct;
