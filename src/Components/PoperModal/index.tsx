import { useState, useEffect } from "react";
import Link from "antd/es/typography/Link";
import style from "./PopperModal.module.scss";
import { useNavigate } from "react-router-dom";

interface IUser {
  avata: string;
  name: string;
}

function PopperModal() {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser === "string") {
      setUser(JSON.parse(storedUser).user);
    }
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("user");

    // Đăng xuất người dùng
    navigate("/signin");
  };
  return (
    <div className={style.wrapper}>
      <div className={style.userMenu_user}>
        <div className={style.userMenu_user_img}>
          <img src="https://picsum.photos/150/150" alt="" />
        </div>
        <div>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      </div>
      <hr />
      <div className={style.userMenu_list}>
        <div className={style.userMenu_item}>
          <Link>Cài đặt</Link>
        </div>
        <div className={style.userMenu_item}>
          <Link onClick={() => handleLogout()}>Đăng xuất</Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default PopperModal;
