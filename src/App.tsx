import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <h1>check for token if existed go to home else go to login</h1>
          }
        />
        <Route
          path="auth"
          element={
            <div>
              {/* to do => cut the design to 2 part of common layout and outlet */}
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="forget-pass" element={<div>forget pass</div>}></Route>
          <Route path="recover-pass" element={<RecoverPassword />}></Route>
        </Route>
        <Route
          path="app"
          element={
            <div>
              <h1>app Layout</h1>
              <Outlet />
            </div>
          }
        >
          <Route index={true} element={<Navigate to="home" replace />} />
          <Route path="home" element={<div>Home Page</div>} />
          <Route path="my-college-gram" element={<div>my College gram</div>} />
          <Route path="my-college-gram" element={<div>my College gram</div>} />
          <Route
            path="post/:id"
            element={<div>post page for specefic id</div>}
          />
        </Route>
        <Route path="error" element={<div>Error page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
