import "./App.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./component/Home";
import Form from "./component/Form";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/form",
      element: <Form/>,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
