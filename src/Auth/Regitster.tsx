import { Button, Checkbox, Form, Input } from "antd";
import { IUser } from "../Types";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const Register = () => {
  const onFinish = (values: IUser) => {
    // console.log("Success:", values);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 50 }}>Đăng ký</h1>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
