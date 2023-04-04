import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Space, Popover } from "antd";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import AdminProducts from "../Admin/Product";
import AdminCategory from "../Admin/Category";
import AdminUser from "../Admin/User";
import PopperModal from "../Components/PoperModal";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Products", "1", <PieChartOutlined />),
  getItem("Categoey", "2", <DesktopOutlined />),
  getItem("User", "3", <UserOutlined />),
];

const LayoutAdmin: React.FC = () => {
  const isUser = true;
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
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            marginTop: 80,
            marginBottom: 100,
            // background: "rgba(255, 255, 255, 0.2)",
            // textAlign: "center",
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
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            height: 100,
            paddingLeft: 42,
            background: colorBgContainer,
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
              <Popover content={PopperModal()} trigger={"click"}>
                <div
                  className="overflow-hidden"
                  style={{ width: 70, height: 70, borderRadius: 999 }}
                >
                  <img
                    src="https://picsum.photos/150/150"
                    alt=""
                    height={"100%"}
                    width={"100%"}
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
        <Content style={{ margin: "50px 16px" }}>
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
            {
              <>
                {" "}
                {selectedKey === "1" && <AdminProducts />}
                {selectedKey === "2" && <AdminCategory />}
                {selectedKey === "3" && <AdminUser />}
              </>
            }
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
