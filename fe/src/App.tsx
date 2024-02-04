import { useRef } from "react";
import "./App.css";
import ListOfProduct from "./component/ListOfProducts";
import Navbar from "./component/Navbar";
import { RouterProvider, createBrowserRouter, useSearchParams } from "react-router-dom";
import Home from "./component/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
