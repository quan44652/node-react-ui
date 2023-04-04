import Link from "antd/es/typography/Link";
import style from "./PopperModal.module.scss";

interface IUser {
  avata: string;
  name: string;
}

function PopperModal() {
  return (
    <div className={style.wrapper}>
      <div className={style.userMenu_user}>
        <div className={style.userMenu_user_img}>
          <img src="https://picsum.photos/150/150" alt="" />
        </div>
        <div>
          <h4>anh quan</h4>
          <p>quannaph28225@gmail.com</p>
        </div>
      </div>
      <hr />
      <div className={style.userMenu_list}>
        <div className={style.userMenu_item}>
          <Link>Cài đặt</Link>
        </div>
        <div className={style.userMenu_item}>
          <Link>Đăng xuất</Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default PopperModal;
