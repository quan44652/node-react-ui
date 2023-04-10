import React from "react";
import { Button, Select, Form, Input } from "antd";
import { ICategory } from "../../Types";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface IProps {
  onAdd: (category: ICategory) => void;
}

const AddCategory = (props: IProps) => {
  const validateTrim = (rule: any, value: string, callback: any) => {
    if (value.trim() === "") {
      callback("Không được nhập khoảng trắng hoặc chuỗi rỗng");
    } else {
      callback();
    }
  };
  const onFinish = (values: ICategory) => {
    props.onAdd(values);
  };
  return (
    <div>
      <h4 className="p-5">New Category</h4>
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
          rules={[
            { required: true, message: "Please input name!" },
            { validator: validateTrim },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
