import axios from "axios";

const BASE_URL = "http://localhost:8000";

export default function restClient({
  url,
  method = "GET",
  params,
  data,
}: {
  url: string;
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  params?: object;
  data?: any;
}) {
  return axios({
    url: `${BASE_URL}/${url}`,
    method,
    params,
    data
  });
}