import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks/hook";
import Button from "../../shared/button";
import { TProduct } from "../../types/product.type";
import Product from "../Product";
import { getProducts } from "../../services/product.api";
import { ProductAction } from "../../redux/actions/product.action";
import { LIMIT } from "../../constant/index,";

export const ListOfProduct = forwardRef<HTMLInputElement>((props, ref) => {
  const products = useAppSelector((state) => state.product.products);
  const totalPage = useAppSelector((state) => state.product.totalPage);
  const activePage = useAppSelector((state) => state.product.activePage);
  const dispatch = useAppDispatch();

  const changePage = (page: number) => {
    if (activePage != page) {
      const inputValue =
        (ref as React.RefObject<HTMLInputElement>)?.current?.value.trim() || "";
      getProducts({
        title_like: inputValue,
        _page: page,
        _limit: LIMIT,
      }).then((res) => {
        dispatch(
          ProductAction(
            res.data.data,
            false,
            res?.data?.pagination?._totalRows / res?.data?.pagination?._limit,
            res?.data?.pagination?._page
          )
        );
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-10 my-5">
        {products?.map((product: TProduct, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
      {activePage && activePage > 0 && totalPage && totalPage > 1 && (
        <div className="flex justify-center">
          {Array.from({ length: totalPage }, (_, index) => (
            <span key={index} className="mx-2 cursor-pointer">
              <Button
                type={activePage !== index + 1 ? "notActive" : "primary"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            </span>
          ))}
        </div>
      )}
    </>
  );
});

export default ListOfProduct;
