import { useParams } from "react-router-dom";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import fetchData from "../../Api";
import { IProducts } from "../../Types";
function ProductDetail() {
  const { id } = useParams();
  const [productCurren, setProductCurrent] = useState<any>({});
  useEffect(() => {
    fetchData({ method: "getOne", url: "/products", id: id }).then((response) =>
      setProductCurrent(response)
    );
  }, []);
  return (
    <div className={style.wrapper}>
      <h4>Chi tiết sản phẩm</h4>
      <div className={style.product}>
        <div className={style.product_img}>
          <img src={productCurren.image} alt="" />
        </div>
        <div className={style.product_info}>
          <h2>{productCurren.name}</h2>
          <p>{productCurren.description}</p>
          <h6>{Intl.NumberFormat().format(productCurren.price)} đ</h6>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
