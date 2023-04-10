import { Link, Outlet, useNavigate } from "react-router-dom";
import style from "../Pages/Home/home.module.scss";
import { useState, useEffect } from "react";

function LayoutUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const storeUser = localStorage.getItem("user");
  useEffect(() => {
    if (storeUser) {
      setUser(JSON.parse(storeUser).user);
    }
  }, []);

  return (
    <div className={style.wrappe}>
      <div className={style.header}>
        <div className={style.logo}>
          <img src="./src/accset/images/logo.svg" alt=""></img>
        </div>
        <form className={style.search}>
          <input type="text" />
          <button>Tìm kiếm</button>
        </form>
        {(user && (
          <div className={style.auth}>
            <div className={style.user}>
              Xin chào: <span>{user.name}</span>
            </div>
            <button
              className={style.btn}
              onClick={() => {
                localStorage.removeItem("user");
                // Đăng xuất người dùng
                navigate("/signin");
              }}
            >
              Logout
            </button>
          </div>
        )) || (
          <div>
            <button className={style.btn}>
              <Link to={"/signup"}>Đăng ký</Link>
            </button>
            <button className={style.btn}>
              <Link to={"/signin"}>Đăng nhập</Link>
            </button>
          </div>
        )}
      </div>
      <Outlet />
      <footer className={style.footer}>
        <p>Liên hệ với Nguyễn Anh Quân</p>
      </footer>
    </div>
  );
}

export default LayoutUser;
