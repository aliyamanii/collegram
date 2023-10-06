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
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import RelationsPage from "./pages/Profile/RelationsPage";
import BlackListShow from "./components/BlackListShow";
import FollowersListShow from "./components/FollowesListShow";
import FollowingsListShow from "./components/FollowingsListShow";
import CloseFriendsListShow from "./components/CloseFriendsListShow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationNavLinks from "./components/Notifications/NotificationNavLinks";
import MyNotifs from "./components/Notifications/MyNotifs";
import OtherNotifs from "./components/Notifications/OtherNotifs";

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
              <Route index={true} element={<ExplorePage />} />
              <Route path="user/:userId">
                <Route index={true} element={<UserProfilePage />} />
                <Route path="post/:id" element={<UserSinglePost />} />
              </Route>
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route index={true} element={<MyPostPage />} />
              <Route path="posts" element={<MyPostPage />} />
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="chat" element={<div>chat</div>} />
              <Route path="notifications" element={<NotificationNavLinks />}>
                <Route
                  index={true}
                  element={<Navigate to="my-notifs" replace={true} />}
                />
                <Route path="my-notifs" element={<MyNotifs />} />
                <Route path="other-notifs" element={<OtherNotifs />} />
              </Route>
              <Route path="list" element={<RelationsPage />}>
                <Route
                  index={true}
                  element={<Navigate to={"followers"} replace={true} />}
                />
                <Route path="closeFriends" element={<CloseFriendsListShow />} />
                <Route path="followers" element={<FollowersListShow />} />
                <Route path="followings" element={<FollowingsListShow />} />
                <Route path="blackList" element={<BlackListShow />} />
              </Route>

              <Route path="history" element={<div>History?</div>} />
              <Route path="post/:id" element={<MySinglePost />} />
            </Route>
            <Route path="search/:searchTag" element={<SearchPage />} />
          </Route>
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        rtl
        theme="light"
        closeButton={false}
      />
    </QueryClientProvider>
  );
}

export default App;
