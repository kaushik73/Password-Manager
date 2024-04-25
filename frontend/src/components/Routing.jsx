import Block from "./Block";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout";
import Login from "./Login";
import Manager from "./Manager";
import Home from "./Home";
import PasswordForm from "./PasswordForm";
import PageNotFound from "./PageNotFound";
import SignUp from "./Signup";
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/view",
        element: <Manager />,
      },
      { path: "/block", element: <Block /> },
      { path: "/addPassword", element: <PasswordForm /> },
      { path: "/passwords", element: <Manager /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);
const Routing = () => {
  return <RouterProvider router={routes} />;
};

export default Routing;
