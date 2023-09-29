import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import RecoverPassword from "./pages/RecoverPasswordPage";
import Auth from "./pages/AuthLayout";
import NewPassword from "./pages/NewPasswordPage";
import Home from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Profile from "./pages/ProfileLayout";
import MyPostPage from "./pages/Profile/MyPostsPage";
import MySinglePost from "./pages/Profile/MySinglePost";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BookmarksPage from "./pages/Profile/BookmarksPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserSinglePost from "./pages/UserSinglePost";

export const client = new QueryClient();

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
            <Route path="people">
              <Route path="user/:userId">
                <Route index={true} element={<UserProfilePage />} />
                <Route path="post/:postId" element={<UserSinglePost />} />
              </Route>
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route index={true} element={<MyPostPage />} />
              <Route path="posts" element={<MyPostPage />} />
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="chat" element={<div>chat</div>} />
              <Route path="notifications" element={<div>Notifications</div>} />
              <Route path="list" element={<div>List?</div>} />
              <Route path="history" element={<div>History?</div>} />
              <Route path="post/:id" element={<MySinglePost />} />
            </Route>
          </Route>
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
