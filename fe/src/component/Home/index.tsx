import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar";
import ListOfProduct from "../ListOfProducts";
import { getProducts } from "../../services/product.api";
import { LIMIT } from "../../constant/index,";
import { useAppDispatch } from "../../hooks/hooks/hook";
import { ProductAction } from "../../redux/actions/product.action";

function Home() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const paramsObject = Object.fromEntries(params.entries());
    console.log(paramsObject);
    if (paramsObject.title && paramsObject.page) {
      const pageNumber = Number(paramsObject.page);

      if (!isNaN(pageNumber)) {
        getProducts({
          title_like: paramsObject.title,
          _page: pageNumber,
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
    } else if (paramsObject.title) {
      getProducts({
        title_like: paramsObject.title,
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
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar ref={ref} />
      <ListOfProduct ref={ref} />
    </div>
  );
}

export default Home;
