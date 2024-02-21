import { useAppDispatch, useAppSelector } from "../../hooks/hooks/hook";
import Button from "../../shared/button";
import { TProduct } from "../../types/product.type";
import Product from "../Product";
import { SetURLSearchParams } from "react-router-dom";

type TProps = { params: URLSearchParams; setParams: SetURLSearchParams };

export const ListOfProduct =(props : TProps) => {
  const products = useAppSelector((state) => state.products.products);
  const totalPage = useAppSelector((state) => state.products.totalPage);
  const activePage = useAppSelector((state) => state.products.activePage);

  const changePage = (page: number) => {
    const paramObject = Object.fromEntries(props.params.entries());
    if (activePage != page) {
      props.setParams({
        ...paramObject,
        page : page.toString()
      })
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
}
export default ListOfProduct;
