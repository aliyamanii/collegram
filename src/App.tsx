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
import ProtectedRoute from "./components/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/app/home"} replace />} />
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route
              path="recover-password"
              element={<RecoverPassword />}
            ></Route>
            <Route path="new-pass/:token" element={<NewPassword />}></Route>
          </Route>

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index={true} element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route
              path="my-college-gram"
              element={<div>my College gram</div>}
            />
            <Route path="people" element={<div>کالج گرامی ها</div>} />
            <Route
              path="post/:id"
              element={<div>post page for specefic id</div>}
            />
          </Route>
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
