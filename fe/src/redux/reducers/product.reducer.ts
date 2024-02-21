import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAction } from "../../types/action.type";
import { ProductConstant } from "../actions/constants";
import { TProduct } from "../../types/product.type";

interface InitialState {
  products: TProduct[];
  totalPage: number;
  loading: boolean;
  activePage: number;
}

interface IProductPayload {
  products: TProduct[];
  totalPage: number;
  activePage: number;
}

const initialState: InitialState = {
  products: [],
  totalPage: 0,
  loading: false,
  activePage: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getProduct: (state, action: PayloadAction<IProductPayload>) => {
      state.products = action.payload.products;
      state.totalPage = action.payload.totalPage;
      state.activePage = action.payload.activePage;
    },
  },
});

export const { getProduct, getProductLoading } = productSlice.actions;

export default productSlice.reducer;

