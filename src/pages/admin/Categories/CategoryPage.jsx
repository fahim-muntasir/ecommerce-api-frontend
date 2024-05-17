// import { Button, Popconfirm, Space, Table, message } from "antd";
// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CategoryPage = () => {
//   const [dataSource,setDataSource] = useState([])
//   const [loading,setLoading] = useState(false)
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BASE_URL;

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     // {
//     //   title: "Email",
//     //   dataIndex: "email",
//     //   key: "email",
//     // },
//     // {
//     //   title: "Address",
//     //   dataIndex: "address",
//     //   key: "address",
//     // },
//     // {
//     //   title: "Role",
//     //   dataIndex: "role",
//     //   key: "role",
//     // },
//     {
//       title:"Oluşturulma Tarihi",
//       dataIndex:"createdAt",
//       key:"createdAt"
//     },
//     {
        
//       title: "İşlemler",
//       dataIndex: "islemler",
//       key: "islemler",
//       render: (_,record) => (
//         <Space>
//             <Button type="primary" onClick={() => navigate (`/admin/categories/update/${record._id}`)}>
//                Düzenle   
//             </Button>
//         <Popconfirm
//         title="Kategoriyi sil"
//         description="Kategoriyi silmek istediğinize emin misin?"
//         okText="Yes"
//         cancelText="No"
//         onConfirm={() => deleteCategory(record._id)}
//       >
//         <Button type="primary" danger>Sil</Button>
//       </Popconfirm>
//       </Space>
//       )
      
//     }
//   ];
//   const fetchCategories = useCallback (async () => {
//     setLoading(true)
  
//     try {
//       const response = await fetch(`${apiUrl}/api/categories`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setDataSource(data);
//       } else {
//         message.error("Veri getirme başarısız.");
//       }
  
//       console.log(response);
//     } catch (error) {
//       console.log("Veri hatası!", error);
//     }finally{
//       setLoading(false)
//     }
//   },[apiUrl]);
  
//   const deleteCategory = async (categoryId) =>{
//     try {
//       const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {method:"DELETE",});
      
//       if (response.ok) {
//         message.success("Kategori başarıyla silindi.")  
//         fetchCategories();
//       } else {
//         message.error("Silme işlemi başarısız.");
//       }
  
//       console.log(response);
//     } catch (error) {
//       console.log("Silme hatası!", error);
//     }finally{
//       setLoading(false)
//     }
//   }

//   useEffect(() => { 
//     fetchCategories();
//   },[fetchCategories]);
//   return <Table loading={loading} dataSource={dataSource} columns={columns} rowKey={(record) => record._id}/>;
// };

// export default CategoryPage;
