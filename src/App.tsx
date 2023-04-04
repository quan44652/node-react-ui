import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./Layout/LayoutAdmin";
import AdminProducts from "./Admin/Product";
import AddProduct from "./Admin/Product/add";
import Dashboard from "./Admin/Dashboard";
import AdminCategory from "./Admin/Category";
import AddCategory from "./Admin/Category/add";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="products">
            <Route index element={<AdminProducts />}></Route>
            <Route path="add" element={<AddProduct />}></Route>
          </Route>
          <Route path="category">
            <Route index element={<AdminCategory />}></Route>
            <Route path="add" element={<AddCategory />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
