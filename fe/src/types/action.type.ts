import { TProduct } from "./product.type";

export type TAction = {
    type : string;
    products ?: TProduct[];
    loading ?: boolean;
    totalPage ?: number;
    activePage ?: number;
}