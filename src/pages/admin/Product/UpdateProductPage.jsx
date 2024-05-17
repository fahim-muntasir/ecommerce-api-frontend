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
          fetch(`${apiUrl}/api/v1/products/${productId}`),
        ]);

        if (!singleProductResponse.ok) {
          message.error("Product data fetch failed.");
          return;
        }

        const [{data : singleProductData}] = await Promise.all([
          singleProductResponse.json(),
        ]);

        if (singleProductData) {
          form.setFieldsValue({
            title: singleProductData.title,
            price: singleProductData.price,
            category: singleProductData.category,
            discount: singleProductData.discount,
            description: singleProductData.description,
            avatar: singleProductData.avatar.join("\n"),
          });
        }
      } catch (error) {
        console.log("Product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    const imgLinks = values.avatar.split("\n").map((link) => link.trim());
    setLoading(true);

    const submitInfo = {
      ...values,
      avatar: imgLinks,
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/products/${productId}`, {
        method: "PATCH",
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
        message.success("The product has been updated successfully.");
        navigate("/admin/products");
      } else {
        message.error("An error occurred while updating the product.");
      }
    } catch (error) {
      console.log("Product update error:", error);
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
            Update
          </Button>
        </Form>
      </Spin>
    </AdminLayout>
  );
};

export default UpdateProductPage;
