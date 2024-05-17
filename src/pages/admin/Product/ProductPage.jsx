import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import AdminLayout from "../../../layouts/AdminLayout";

const ProductPage = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />,
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Ürün İsimi",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },

    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
    },
    {
      title: "İşlemler",
      dataIndex: "islemler",
      key: "islemler",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Ürünü sil"
            description="Ürünü silmek istediğinize emin misin?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/products`);

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

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${categoryId}`, {
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
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

export default ProductPage;
