import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutAdmin from "./Layout/LayoutAdmin";
import AdminProducts from "./Admin/Product";
import AddProduct from "./Admin/Product/add";
import Dashboard from "./Admin/Dashboard";
import AdminCategory from "./Admin/Category";
import AddCategory from "./Admin/Category/add";
import AdminUser from "./Admin/User";
import fetchData from "./Api";
import { ICategory, IProducts, IUser } from "./Types";
import { toast } from "react-toastify";
import UpdateProduct from "./Admin/Product/update";
import UpdateCategory from "./Admin/Category/update";
import Login from "./Auth/Login";
import Register from "./Auth/Regitster";

function App() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({ method: "get", url: "/products" }).then((response) =>
      setProducts(response)
    );
  }, []);
  useEffect(() => {
    fetchData({ method: "get", url: "/categories" }).then((response) =>
      setCategories(response)
    );
  }, []);

  useEffect(() => {
    fetchData({ method: "get", url: "/users" }).then((response) =>
      setUsers(response)
    );
  }, []);

  const handleRemoveProduct = (id: number) => {
    fetchData({ method: "delete", url: "/products", id: id }).then(() => {
      setProducts(products.filter((item: IProducts) => item.id != id));
      toast.success("Xóa thành công");
    });
  };
  const handleAddProduct = (product: IProducts) => {
    fetchData({ method: "post", url: "/products", data: product }).then(() => {
      setProducts([
        ...products,
        {
          id: Number(products[products.length - 1]?.id) + 1 || 1,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          categoryId: product.categoryId,
        },
      ]);
      toast.success("Thêm thành công");
      navigate("/admin/products");
    });
  };
  const handleUpdateProduct = (id: number, product: IProducts) => {
    fetchData({ method: "put", url: "/products", data: product, id: id }).then(
      () => {
        setProducts(
          products.map((item) =>
            item.id == id ? { id: id, ...product } : item
          )
        );
        toast.success("Sửa thành công");
        navigate("/admin/products");
      }
    );
  };

  // Category

  const handleAddCategory = (category: ICategory) => {
    fetchData({ method: "post", url: "/categories", data: category }).then(
      () => {
        setCategories([
          ...categories,
          { id: categories[categories.length - 1].id + 1, name: category.name },
        ]);
        toast.success("Thêm thành công");
        navigate("/admin/category");
      }
    );
  };

  const handleRemoveCategory = (id: number) => {
    fetchData({ method: "delete", url: "/categories", id: id }).then(() => {
      setCategories(categories.filter((item: ICategory) => item.id != id));
      toast.success("Xóa thành công");
    });
  };

  const handleUpdateCategory = (id: number, category: ICategory) => {
    fetchData({
      method: "put",
      url: "/categories",
      data: category,
      id: id,
    }).then(() => {
      setCategories(
        categories.map((item) => (item.id == id ? category : item))
      );
      toast.success("Sửa thành công");
      navigate("/admin/category");
    });
  };

  // User

  const handleRemoveUser = (id: number) => {
    fetchData({ method: "delete", url: "/users", id: id }).then(() => {
      setUsers(users.filter((item: IUser) => item.id != id));
      toast.success("Xóa thành công");
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="products">
            <Route
              index
              element={
                <AdminProducts
                  products={products}
                  onRemove={handleRemoveProduct}
                  categories={categories}
                />
              }
            ></Route>
            <Route
              path="add"
              element={
                <AddProduct onAdd={handleAddProduct} categories={categories} />
              }
            ></Route>
            <Route
              path="update/:id"
              element={
                <UpdateProduct
                  onUpdate={handleUpdateProduct}
                  categories={categories}
                />
              }
            ></Route>
          </Route>
          <Route path="category">
            <Route
              index
              element={
                <AdminCategory
                  categories={categories}
                  onRemove={handleRemoveCategory}
                />
              }
            ></Route>
            <Route
              path="add"
              element={<AddCategory onAdd={handleAddCategory} />}
            ></Route>
            <Route
              path="update/:id"
              element={<UpdateCategory onUpdate={handleUpdateCategory} />}
            ></Route>
          </Route>
          <Route path="user">
            <Route
              index
              element={<AdminUser users={users} onRemove={handleRemoveUser} />}
            ></Route>
          </Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="regitster" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
