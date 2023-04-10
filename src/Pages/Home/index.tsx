import { Link } from "react-router-dom";
import style from "./home.module.scss";
import { IProducts } from "../../Types";
import { useEffect, useState } from "react";
interface IProps {
  products: IProducts[];
}

function HomePage(props: IProps) {
  const [productList, setProductList] = useState<IProducts[]>([]);
  useEffect(() => {
    setProductList(props.products);
  }, [props.products]);

  return (
    <div className={style.body}>
      <div className={style.side_left}>
        <h4>Danh mục sản phẩm</h4>
        <ul className={style.category}>
          <li>
            <Link to={"/"}>Điện thoại</Link>
          </li>
          <li>
            <Link to={"/"}>Máy tính</Link>
          </li>
          <li>
            <Link to={"/"}>Tivi</Link>
          </li>
        </ul>
      </div>
      <div className={style.side_right}>
        <h4>Nhà sách tiki</h4>
        <div className={style.banner}>
          <img src="./src/accset/images/banner.png" alt=""></img>
        </div>
        <ul className={style.sort}>
          <li>
            <Link to={"/"}>Mới nhất</Link>
          </li>
          <li>
            <Link to={"/"}>Giá thấp</Link>
          </li>
          <li>
            <Link to={"/"}>Giá cao</Link>
          </li>
        </ul>
        <div className={style.product_list}>
          {productList.map((item, index) => (
            <div key={index} className={style.product_item}>
              <div className={style.product}>
                <Link to={"/detail/" + item._id} className={style.product_img}>
                  <img src={item.image} alt="" />
                </Link>
                <div className={style.product_info}>
                  <span>{item.name}</span>
                  <p>{item.description}</p>
                  <h6> {Intl.NumberFormat().format(item.price)} đ</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
