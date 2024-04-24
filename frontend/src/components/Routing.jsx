import Block from "./Block";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Login from "./Login";
import Manager from "./Manager";
import Home from "./Home";
import PasswordForm from "./PasswordForm";
import PageNotFound from "./PageNotFound";
import SignUp from "./Signup";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="view" element={<Manager />} />
          <Route path="block" element={<Block />} />
          <Route path="addPassword" element={<PasswordForm />} />
          <Route path="passwords" element={<Manager />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
