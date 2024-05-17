import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import { AuthContext } from "../../../context/AuthProvider";
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../../layouts/AdminLayout";

const CreateProductPage = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    setLoading(true);

    setLoading(true);

    const submitInfo = {
      ...values,
      price: {
        current: values.current,
        discount: values.discount,
      },
      doctor: {
        name: values.doctorName,
        about: values.aboutDoctor
      },
      img: imgLinks,
    }
    console.log(submitInfo);

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(submitInfo),
      });

      if (response.status === 401) {
        logout();
      }


      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası:", error);
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
            label="Doctore name"
            name="doctorName"
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
            label="About Doctor"
            name="aboutDoctor"
            // rules={[
            //   {
            //     required: true,
            //     message: "Lütfen bir ürün açıklaması girin!",
            //   },
            // ]}
          >
            <ReactQuill
              theme="snow"
              style={{
                backgroundColor: "white",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Ingredients"
            name="ingredients"
            // rules={[
            //   {
            //     required: true,
            //     message: "Lütfen bir ürün açıklaması girin!",
            //   },
            // ]}
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
            Oluştur
          </Button>
        </Form>
      </Spin>
    </AdminLayout>
  );
};

export default CreateProductPage;
