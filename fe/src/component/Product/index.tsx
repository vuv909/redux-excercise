import Button from "../../shared/button";
import { TProduct } from "../../types/product.type";

type Props = {
  product: TProduct;
};

export default function Product(props: Props) {
  return (
    <div className="border border-gray-300 w-56 rounded-md bg-white">
      <img
        className="h-64 w-60 rounded-md"
        src={`${props.product.image}`}
        alt=""
      />
      <p className="text-center my-3 ">
        {props.product.title && props.product.title.length > 20
          ? `${props.product.title.slice(0, 20)}...`
          : props.product.title}
      </p>
      <div className="flex justify-center mb-3 mt-8">
        <Button hover="primaryHover">Thêm vào giỏ hàng</Button>
      </div>
    </div>
  );
}
