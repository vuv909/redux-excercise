import { useEffect, useRef } from "react";
import { Navbar } from "../Navbar";
import { ListOfProduct } from "../ListOfProducts";
import { useAppDispatch } from "../../hooks/hooks/hook";
import { ProductAction } from "../../redux/actions/product.action";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../services/product.api";
import { LIMIT } from "../../constant/index,";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

function Home() {
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data, isLoading, isError } = useQuery(["products", params], () =>
    fetchProducts(params)
  );

  const fetchProducts = async (params: URLSearchParams) => {
    const paramsObject = Object.fromEntries(params.entries());
    const pageNumber = Number(paramsObject.page);
    const res = await getProducts({
      title_like: paramsObject.title,
      _page: pageNumber,
      _limit: LIMIT,
    });
    return res.data;
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const { pagination, data: productsData } = data;
      dispatch(
        ProductAction(
          productsData,
          false,
          pagination._totalRows / pagination._limit,
          pagination._page
        )
      );
    }
  }, [data, isLoading, isError]);

  return (
    <div className="bg-gray-100">
      <Navbar ref={ref} />
      <ListOfProduct ref={ref} />
    </div>
  );
}

const queryClient = new QueryClient();

const HomeWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default HomeWithQueryClient;
