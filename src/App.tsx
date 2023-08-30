import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import RecoverPassword from "./pages/RecoverPasswordPage";
import Auth from "./pages/AuthLayout";
import NewPassword from "./pages/NewPasswordPage";
import Home from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";

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
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="recover-password" element={<RecoverPassword />}></Route>
          <Route path="new-pass" element={<NewPassword />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route index={true} element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="my-college-gram" element={<div>my College gram</div>} />
          <Route path="people" element={<div>کالج گرامی ها</div>} />
          <Route
            path="post/:id"
            element={<div>post page for specefic id</div>}
          />
        </Route>
        <Route path="error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
