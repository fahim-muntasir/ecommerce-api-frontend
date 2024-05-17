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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "İşlemler",
      dataIndex: "islemler",
      key: "islemler",
      render: (_, record) => (
        <Popconfirm
          title="Kullanıcıyı sil"
          description="Kullanıcıyı silmek istediğinize emin misin?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users`, {
        method: "GET",
        headers: {
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

      console.log(response);
    } catch (error) {
      console.log("Veri hatası!", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi.");
        fetchUsers();
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
