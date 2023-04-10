import React from "react";
import { useState, useEffect } from "react";
import { Button, Select, Form, Input } from "antd";
import { ICategory } from "../../Types";
import { useParams } from "react-router-dom";
import fetchData from "../../Api";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface IProps {
  onUpdate: (id: string | undefined, category: ICategory) => void;
}

const UpdateCategory: any = (props: IProps) => {
  const validateTrim = (rule: any, value: string, callback: any) => {
    if (value.trim() === "") {
      callback("Không được nhập khoảng trắng hoặc chuỗi rỗng");
    } else {
      callback();
    }
  };
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchData({ method: "getOne", url: "/categories", id: id }).then((data) =>
      setCategoryCurrent(data)
    );
  }, []);
  console.log(categoryCurrent);
  const onFinish = (values: ICategory) => {
    props.onUpdate(id, values);
  };
  if (Object.keys(categoryCurrent).length === 0) {
    return;
  }
  return (
    <div>
      <h4 className="p-5">Update Category</h4>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...categoryCurrent }}
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

export default UpdateCategory;
