import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import publicRoute, { privateRoute } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGenres } from "./store/app/asyncAction";
import { ToastContainer } from "react-toastify";
import path from "./utils/path";
function App() {
  const {userData} = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="text-white">
        <Routes>
          {publicRoute.map((item, index) => {
            const Page = item.component;
            const Layout = item.layout;
            return (
              <Route
                key={index}
                path={item.pathRoute}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {userData?.role === "admin" &&
          privateRoute.map((item, index) => {
            const Page = item.component;
            const Layout = item.layout;
            return (
              <Route
                key={index}
                path={item.pathRoute}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
          }
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
