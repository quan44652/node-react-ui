import { Button, Select, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import { IProducts, ICategory } from "../../Types";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const CLOUD_NAME = "dl3q8klyg";
const PRESET_NAME = "portfolio";
const FOLDER_NAME = "portfolio";

interface IProps {
  onAdd: (product: IProducts) => void;
  categories: ICategory[];
}

const AddProduct = (props: IProps) => {
  const [uploadFile, setUploadFile] = useState<string>("");
  const onFinish = (values: any) => {
    props.onAdd({
      name: values.name,
      price: values.price,
      image: uploadFile,
      description: values.description,
      categoryId: values.categoryId,
    });
  };

  const handleUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      setUploadFile(info.file.response.secure_url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(
        `${info.file.name} [file upload failed](poe://www.poe.com/_api/key_phrase?phrase=file%20upload%20failed&prompt=Tell%20me%20more%20about%20file%20upload%20failed.).`
      );
    }
  };

  return (
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
        <Form.Item name="file" label="Upload">
          <Upload
            action={`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`}
            data={{ upload_preset: PRESET_NAME, folder: FOLDER_NAME }}
            maxCount={1}
            listType="picture"
            accept=".jpg,.jpeg,.png"
            onChange={(info) => handleUpload(info)}
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
          <Select placeholder="Chọn Danh Mục">
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
};

export default AddProduct;
