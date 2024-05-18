import { Table, message } from "antd";
import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import AdminLayout from "../../layouts/AdminLayout";

const UserOrderPage = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { accessToken, logout, user } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const getPaymentStatusStyle = (status) => {
    let style = {};
    let color = "";

    switch (status) {
      case "pending":
        color = "blue";
        break;
      case "paid":
        color = "green";
        break;
      case "failed":
        color = "red";
        break;
      default:
        color = "black";
    }

    style = {
      color: color,
    };

    return style;
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "name",
      render: (customer) => <span>{customer.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "customer",
      key: "email",
      render: (customer) => <span>{customer.email}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalprice",
      key: "totalprice",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Payment",
      dataIndex: "paymentstatus",
      key: "paymentstatus",
      render: (status) => (
        <span style={getPaymentStatusStyle(status)}>{status}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${user.id}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const { data } = await response.json();

        setDataSource(data);
      } else {
        message.error("Data fetch failed!");
      }
    } catch (error) {
      console.log("Order fetch error!", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Product",
        dataIndex: "avatar",
        key: "avatar",
        render: (product) => (
          <img src={product[0]} alt="Image" width={100} height={100} />
        ),
      },
      { title: "Product Name", dataIndex: "title", key: "title" },
      { title: "Price", dataIndex: "price", key: "price" },
      {
        title: "Discount",
        dataIndex: "discount",
        key: "discount",
        render: (discount) => <span>{discount}%</span>,
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    return (
      <Table columns={columns} dataSource={record.items} pagination={false} />
    );
  };

  return (
    <AdminLayout>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.id] : []);
          },
          expandedRowKeys,
        }}
      />
    </AdminLayout>
  );
};

export default UserOrderPage;
