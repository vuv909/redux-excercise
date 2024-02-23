import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar";
import ListOfProduct from "../ListOfProducts";
import { getProducts } from "../../services/product.api";
import { LIMIT } from "../../constant/index,";
import { useAppDispatch } from "../../hooks/hooks/hook";
import { ProductAction } from "../../redux/actions/product.action";
import {
  getProduct,
  getProductLoading,
} from "../../redux/reducers/product.reducer";

function Home() {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState<number>(1);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const paramsObject = Object.fromEntries(params.entries());
            if (paramsObject.title && paramsObject.page) {
              const pageNumber = Number(paramsObject.page);
              if (!isNaN(pageNumber)) {
                dispatch(getProductLoading(true));
                getProducts({
                  title_like: paramsObject.title,
                  _page: pageNumber,
                  _limit: LIMIT,
                })
                  .then((res) => {
                    dispatch(getProductLoading(false));
                    dispatch(
                      getProduct({
                        products: res.data.data,
                        totalPage:
                          res.data.pagination._totalRows /
                          res.data.pagination._limit,
                        activePage: res.data.pagination._page,
                      })
                    );
                  })
                  .catch((error) => {
                    dispatch(getProductLoading(false));
                  });
              }
            } else if (paramsObject.title) {
              dispatch(getProductLoading(true));
              getProducts({
                title_like: paramsObject.title,
                _limit: LIMIT,
              })
                .then((res) => {
                  dispatch(getProductLoading(false));
                  dispatch(
                    getProduct({
                      products: res.data.data,
                      totalPage:
                        res.data.pagination._totalRows /
                        res.data.pagination._limit,
                      activePage: res.data.pagination._page,
                    })
                  );
                })
                .catch((error) => {
                  dispatch(getProductLoading(false));
                });
            } else {
              dispatch(getProductLoading(true));
              getProducts({
                _page: activePage,
                _limit: LIMIT,
              })
                .then((res) => {
                  dispatch(getProductLoading(false));
                  dispatch(
                    getProduct({
                      products: res.data.data,
                      totalPage:
                        res.data.pagination._totalRows /
                        res.data.pagination._limit,
                      activePage: res.data.pagination._page,
                    })
                  );
                })
                .catch((error) => {
                  dispatch(getProductLoading(false));
                });
            }
          }
        });
      },
      {
        threshold: 1,
      }
    );

    if(observer.current){
      const listProductElement = document.getElementById("listProduct");
      if(listProductElement){
        observer.current.observe(listProductElement)
      }
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [params]);

  return (
    <div className="bg-gray-100">
      <Navbar params={params} setParams={setParams} />
      <div id="listProduct">
        <ListOfProduct params={params} setParams={setParams} />
      </div>
    </div>
  );
}

export default Home;
