import restClient from "./restClient";

export function getProducts(params?: object) {
  return restClient({
    url: "/products",
    params,
  });
}