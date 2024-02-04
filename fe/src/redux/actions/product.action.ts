import { TProduct } from "../../types/product.type";
import { ProductConstant } from "./constants";

export const ProductAction = (products?: TProduct[], loading?: boolean , totalPage ?: number, activePage ?: number) => {
  return {
    type: ProductConstant.GETPRODUCT,
    products,
    loading,
    totalPage,
    activePage
  };
};

