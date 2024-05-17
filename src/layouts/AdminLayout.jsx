import { useContext } from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  DashboardOutlined,
  // AppstoreOutlined,
  LaptopOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"

const { Sider, Header, Content } = Layout;

// const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem("auth"));
//   return user ? user.role : null;
// };

const AdminLayout = ({children}) => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  // const userRole = getUserRole();

  const menuItemsForAdmin = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/dashboard`);
      },
    },
    // {
    //   key: "2",
    //   icon: <AppstoreOutlined />,
    //   label: "Kategoriler",
    //   path: "/",
    //   children: [
    //     {
    //       key: "3",
    //       label: "Kategori Listesi",
    //       path: "/admin/categories",
    //       onClick: () => {
    //         navigate(`/admin/categories`);
    //       },
    //     },
    //     {
    //       key: "4",
    //       label: "Yeni Kategori Oluştur",
    //       path: "/admin/categories/create",
    //       onClick: () => {
    //         navigate("/admin/categories/create");
    //       },
    //     },
    //   ],
    // },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },

    {
      key: "11",
      icon: <UserOutlined />,
      label: "Users",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Shop Now",
      onClick: () => {
        navigate(`/`);
      },
    },
  ];

  const menuItemsForUser = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/dashboard`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Your Orders",
      onClick: () => {
        navigate(`/user/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        navigate(`/`);
      },
    },
  ];

  if (user?.role === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItemsForAdmin}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                {" "}
                <h2>Admin Pane</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }

  if (user?.role === "user") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItemsForUser}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                {" "}
                <h2>Admin Pane</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
