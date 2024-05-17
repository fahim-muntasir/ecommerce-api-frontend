import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState, useContext } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { AuthContext } from "../../context/AuthProvider";

const AdminUserPage = () => {
  const {accessToken, logout} = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete user"
          description="Are you sure you want to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.id)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/v1/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const {data} = await response.json();
        setDataSource(data);
      } else {
        message.error("User data fetch failed.");
      }

      console.log(response);
    } catch (error) {
      console.log("User data fetch error", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser = async (userid) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/users/${userid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        message.success("The user has been deleted successfully.");
        fetchUsers();
      } else {
        message.error("Deletion failed.");
      }

      console.log(response);
    } catch (error) {
      console.log("User delete error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <AdminLayout>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </AdminLayout>
  );
};

export default AdminUserPage;
