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
      const response = await fetch(`${apiUrl}/api/v1/orders/status/${record.id}`, {
        method: "PATCH",
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
        console.log(updatedOrder);

        message.success("Status has been updated successfully.");
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
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
          <Select.Option value="cancelled">Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete the product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteOrder(record.id)}
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
      const response = await fetch(`${apiUrl}/api/v1/orders`, {
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
        console.log(data);
        setDataSource(data);
      } else {
        message.error("Order data fetch failed!");
      }
    } catch (error) {
      console.log("Order error!", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        message.success("The order was successfully deleted.");
        fetchCategories();
      } else {
        message.error("Deletion failed.");
      }

      console.log(response);
    } catch (error) {
      console.log("Delete error!", error);
    } finally {
      setLoading(false);
    }
  };

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

    const addressColumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
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
          dataSource={[record.orderinfo]}
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

export default Orders;
