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
    const imgLinks = values.avatar.split(",").map((link) => link.trim());
    setLoading(true);

    setLoading(true);

    const submitInfo = {
      ...values,
      avatar: imgLinks,
    }
    console.log(submitInfo);

    try {
      const response = await fetch(`${apiUrl}/api/v1/products`, {
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
      const datadd = await response.json();
      console.log(datadd)

      if (response.ok) {
        message.success("Product created successfully.");
        form.resetFields();
      } else {
        message.error("An error occurred while creating the product.");
      }
    } catch (error) {
      console.log("Product creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Spin spinning={loading}>
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Product Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Product title is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Discount price"
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
            label="Product Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Product category is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required!",
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
            label="Product Images (Link)"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please enter at least 4 product image links!",
              },
            ]}
          >
            <Input.TextArea
              placeholder={`Write each image link on a new line. \n https://example1 \n https://example2`}
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Spin>
    </AdminLayout>
  );
};

export default CreateProductPage;
