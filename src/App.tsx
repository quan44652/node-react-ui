import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutAdmin from "./Layout/LayoutAdmin";
import AdminProducts from "./Admin/Product";
import AddProduct from "./Admin/Product/add";
import AdminCategory from "./Admin/Category";
import AddCategory from "./Admin/Category/add";
import AdminUser from "./Admin/User";
import fetchData from "./Api";
import { ICategory, ILogin, IProducts, IRegister, IUser } from "./Types";
import { toast } from "react-toastify";
import UpdateProduct from "./Admin/Product/update";
import UpdateCategory from "./Admin/Category/update";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import ProductDetail from "./Pages/DetailProduct";
import LayoutUser from "./Layout/LayoutUser";
import HomePage from "./Pages/Home";

function App() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({ method: "get", url: "/products" }).then((response) =>
      setProducts(
        response.docs.map((item: IProducts, index: number) => {
          return {
            key: index + 1,
            ...item,
          };
        })
      )
    );
  }, []);
  useEffect(() => {
    fetchData({ method: "get", url: "/categories" }).then((response) =>
      setCategories(
        response.map((item: ICategory, index: number) => {
          return {
            key: index + 1,
            ...item,
          };
        })
      )
    );
  }, []);

  useEffect(() => {
    fetchData({ method: "get", url: "/users" }).then((response) =>
      setUsers(
        response.map((item: IUser, index: number) => {
          return {
            key: index + 1,
            ...item,
          };
        })
      )
    );
  }, []);

  const handleRemoveProduct = (id: string) => {
    fetchData({ method: "delete", url: "/products", id: id }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        setProducts(products.filter((item: IProducts) => item._id != id));
        toast.success("Xóa thành công");
      }
    );
  };

  const handleAddProduct = (product: IProducts) => {
    fetchData({ method: "post", url: "/products", data: product }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        setProducts([
          ...products,
          {
            key: Number(products[products.length - 1]?.key) + 1 || 1,
            ...response,
          },
        ]);
        toast.success("Thêm thành công");
        // navigate("/admin/products");
      }
    );
  };
  const handleUpdateProduct = (id: string, product: IProducts) => {
    fetchData({ method: "put", url: "/products", data: product, id: id }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        setProducts(
          products.map((item, index) =>
            item._id == id ? { key: index + 1, _id: id, ...product } : item
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
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        setCategories([
          ...categories,
          {
            key: Number(categories[categories.length - 1]?.key) + 1 || 1,
            ...response,
          },
        ]);
        toast.success("Thêm thành công");
        navigate("/admin/category");
      }
    );
  };

  const handleRemoveCategory = (id: string) => {
    fetchData({ method: "delete", url: "/categories", id: id }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        setCategories(categories.filter((item: ICategory) => item._id != id));
        toast.success("Xóa thành công");
      }
    );
  };

  const handleUpdateCategory = (id: string, category: ICategory) => {
    fetchData({
      method: "put",
      url: "/categories",
      data: category,
      id: id,
    }).then((response) => {
      if (response.message) {
        return Array.isArray(response.message)
          ? response.message.map((item: string) => toast.warning(item))
          : toast.warning(response.message);
      }
      setCategories(
        categories.map((item, index) =>
          item._id == id ? { key: index + 1, ...category } : item
        )
      );
      toast.success("Sửa thành công");
      navigate("/admin/category");
    });
  };

  // User

  const handleRemoveUser = (id: string) => {
    fetchData({ method: "delete", url: "/users", id: id }).then(() => {
      setUsers(users.filter((item: IUser) => item._id != id));
      toast.success("Xóa thành công");
    });
  };

  const signup = (values: IRegister) => {
    fetchData({ method: "post", url: "/signup", data: values }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        toast.success("Đăng ký thành công !!!");
      }
    );
  };

  const signin = (values: ILogin) => {
    fetchData({ method: "post", url: "/signin", data: values }).then(
      (response) => {
        if (response.message) {
          return Array.isArray(response.message)
            ? response.message.map((item: string) => toast.warning(item))
            : toast.warning(response.message);
        }
        localStorage.setItem("user", JSON.stringify(response));
        toast.success("Đăng nhập thành công !!!");
        navigate("/");
      }
    );
  };

  const handleAuthorize = (id: string) => {
    fetchData({ method: "patch", url: "/users", id: id }).then((response) => {
      const newUsers = users.map((item: IUser) => {
        const { role, ...rest } = item;
        return item._id == id ? { role: "admin", ...rest } : item;
      });
      setUsers(newUsers);
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
              element={
                <AdminUser
                  users={users}
                  onRemove={handleRemoveUser}
                  onAuthorize={handleAuthorize}
                />
              }
            ></Route>
          </Route>
        </Route>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<HomePage products={products} />}></Route>
          <Route path="detail/:id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="signin" element={<Signin onSignin={signin} />}></Route>
        <Route path="signup" element={<Signup onSignup={signup} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
