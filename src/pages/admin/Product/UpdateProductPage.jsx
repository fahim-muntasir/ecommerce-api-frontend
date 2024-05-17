import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../../layouts/AdminLayout";
import { AuthContext } from "../../../context/AuthProvider";

const UpdateProductPage = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!singleProductResponse.ok) {
          message.error("Veri getirme başarısız.");
          return;
        }

        const [singleProductData] = await Promise.all([
          singleProductResponse.json(),
        ]);

        if (singleProductData) {
          form.setFieldsValue({
            name: singleProductData.name,
            current: singleProductData.price.current,
            discount: singleProductData.price.discount,
            description: singleProductData.description,
            img: singleProductData.img.join("\n"),
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    setLoading(true);

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },

          img: imgLinks,
        }),
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        message.success("Ürün başarıyla güncellendi.");
        navigate("/admin/products");
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Spin spinning={loading}>
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Ürün İsmi"
            name="name"
            rules={[
              {
                required: true,
                message: "Lütfen Ürün adını girin!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fiyat"
            name="current"
            rules={[
              {
                required: true,
                message: "Lütfen ürün fiyatını girin!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="İndirim Oranı"
            name="discount"
            rules={[
              {
                required: true,
                message: "Lütfen bir ürün indirim oranı girin!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Ürün Açıklaması"
            name="description"
            rules={[
              {
                required: true,
                message: "Lütfen bir ürün açıklaması girin!",
              },
            ]}
          >
            <ReactQuill
              theme="snow"
              style={{
                backgroundColor: "white",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Ürün Görselleri (Linkler)"
            name="img"
            rules={[
              {
                required: true,
                message: "Lütfen en az 4 ürün görsel linki girin!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Her bir görsel linkini yeni bir satıra yazın."
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form>
      </Spin>
    </AdminLayout>
  );
};

export default UpdateProductPage;
