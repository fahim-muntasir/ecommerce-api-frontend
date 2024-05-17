import { Button, Popconfirm, Space, Table, message, Select } from "antd";
import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AdminLayout from "../../../layouts/AdminLayout";

const Orders = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { accessToken, logout } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleStatusChange = async (value, record) => {
    console.log(record);
    console.log(value);
    try {
      const response = await fetch(`${apiUrl}/api/order/status/${record._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: value }),
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const updatedOrder = await response.json();

        message.success(updatedOrder?.message);
      } else {
        message.error("Failed to update order status:");
      }
    } catch (error) {
      message.error("Error updating order status:");
    }
  };

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
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Confirm">Confirm</Select.Option>
          <Select.Option value="Delivered">Delivered</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      dataIndex: "islemler",
      key: "islemler",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Ürünü sil"
            description="Ürünü silmek istediğinize emin misin?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteOrder(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/order`, {
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
        console.log(data);
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

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${apiUrl}/api/order/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        fetchCategories();
      } else {
        message.error("Silme işlemi başarısız.");
      }

      console.log(response);
    } catch (error) {
      console.log("Silme hatası!", error);
    } finally {
      setLoading(false);
    }
  };

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

    const addressColumns = [
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Area",
        dataIndex: "area",
        key: "area",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
    ];

    return (
      <>
        <Table
        columns={addressColumns}
        dataSource={[record.orderInfo]}
        pagination={false}
      />
      <Table columns={columns} dataSource={record.items} pagination={false} />
      </>
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

export default Orders;
