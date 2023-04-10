import { Button, Checkbox, Form, Input } from "antd";
import { ILogin, IUser } from "../Types";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
interface IProps {
  onSignin: (values: ILogin) => void;
}
const Signin = (props: IProps) => {
  const onFinish = (values: ILogin) => {
    props.onSignin({ email: values.email, password: values.password });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 40 }}>Đăng nhập</h1>
      <Form
        name="basic"
        labelCol={{
          span: 4,
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
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
export default Signin;
