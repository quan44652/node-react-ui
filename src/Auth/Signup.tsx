import { Button, Checkbox, Form, Input } from "antd";
import { IRegister } from "../Types";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
interface IProps {
  onSignup: (values: IRegister) => void;
}
const Signup = (props: IProps) => {
  const validateTrim = (rule: any, value: string, callback: any) => {
    if (value.trim() === "") {
      callback("Không được nhập khoảng trắng hoặc chuỗi rỗng");
    } else {
      callback();
    }
  };
  const onFinish = (values: IRegister) => {
    props.onSignup(values);
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
            {
              validator: validateTrim,
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
              message: "Please input your email!",
            },
            { type: "email", message: "Email không đúng định dạng!" },
            {
              validator: validateTrim,
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
          name="confirmPassword"
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
export default Signup;
