import { Button, Popconfirm, Space, Table, message, Select } from "antd";
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
      case "Pending":
        color = "blue";
        break;
      case "Paid":
        color = "green";
        break;
      case "Failed":
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
      key: "username",
      render: (customer) => <span>{customer.username}</span>,
    },
    {
      title: "Email",
      dataIndex: "customer",
      key: "email",
      render: (customer) => <span>{customer.email}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
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
      const response = await fetch(`${apiUrl}/api/order/${user.id}`, {
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
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri hatası!", error);
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
        dataIndex: "product",
        key: "product",
        render: (product) => (
          <img src={product.img[0]} alt="Image" width={100} />
        ),
      },
      { title: "Product Name", dataIndex: "productName", key: "productName" },
      { title: "Price", dataIndex: "price", key: "price" },
      {
        title: "Discount",
        dataIndex: "product",
        key: "product",
        render: (product) => <span>{product?.price?.discount}%</span>,
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
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record._id] : []);
          },
          expandedRowKeys,
        }}
      />
    </AdminLayout>
  );
};

export default UserOrderPage;
