import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Space, Popover } from "antd";
import { Layout, Menu, theme } from "antd";
import PopperModal from "../Components/PoperModal";

const { Header, Content, Footer, Sider } = Layout;

interface IMenu {
  key: string;
  icon: JSX.Element;
  label: string;
  to: string;
}

const menuItems = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Products",
    to: "/admin/products",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Category",
    to: "/admin/category",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "User",
    to: "/admin/user",
  },
];

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser === "string") {
      setIsUser(true);
    }
    if (!storedUser) {
      navigate("/signin");
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("1");
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 0,
            margin: 16,
            marginTop: 80,
            marginBottom: 100,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://marketplace.magento.com/media/catalog/product/4/a/4acb_rsz_admin-logo_1.png"
            alt=""
            width={"100%"}
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link className="text-decoration-none" to={item.to}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            minHeight: 80,
            background: "#fff",
            boxShadow: "1px 1px 1px 1px #ddd",
            margin: "0 24px",
            borderRadius: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {selectedKey === "1" && (
              <h1 style={{ fontSize: 32, margin: 0 }}>Management Products</h1>
            )}
            {selectedKey === "2" && (
              <h1 style={{ fontSize: 32, margin: 0 }}>Management Category</h1>
            )}
            {selectedKey === "3" && (
              <h1 style={{ fontSize: 32, margin: 0 }}>Management User</h1>
            )}
          </div>
          <div>
            {(isUser && (
              <Popover
                placement="bottomLeft"
                content={<PopperModal />}
                trigger={"click"}
              >
                <div className="overflow-hidden" style={{}}>
                  <img
                    src="https://picsum.photos/150/150"
                    alt=""
                    style={{ width: 50, height: 50, borderRadius: 999 }}
                  />
                </div>
              </Popover>
            )) || (
              <Space wrap>
                <Button className="fs-5" type="link" danger>
                  <Link className="text-decoration-none" to={"/"}>
                    Login
                  </Link>
                </Button>
                <Button className="fs-5" type="link" danger>
                  <Link className="text-decoration-none" to={"/"}>
                    Regitster
                  </Link>
                </Button>
              </Space>
            )}
          </div>
        </Header>
        <Content style={{ margin: 24 }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: 18,
              background: colorBgContainer,
            }}
          >
            {" "}
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
