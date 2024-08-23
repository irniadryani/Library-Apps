import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/index";
import SecureRoute from "../components/SecureRoute";
import AuthorizeLayout from "../components/Layout/AuthorizeLayout";
import NoAuthorizeLayout from "../components/Layout/NoAuthorizeLayout";
import BookPage from "../pages/Book/index"
import TransactionPage from "../pages/Transaction/index"

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <SecureRoute>
            <AuthorizeLayout />
          </SecureRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Route>

      <Route element={<NoAuthorizeLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </>
  )
);

export default Router;
