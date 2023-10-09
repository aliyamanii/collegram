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

import SignUp from "./pages/Auth/SignUpPage";
import Login from "./pages/Auth/LoginPage";
import RecoverPassword from "./pages/Auth/RecoverPasswordPage";
import Auth from "./pages/Auth/AuthLayout";
import NewPassword from "./pages/Auth/NewPasswordPage";
import Home from "./pages/App/HomePage";
import AppLayout from "./pages/App/AppLayout";
import Profile from "./pages/MyProfile/ProfileLayout";
import MyPostPage from "./pages/MyProfile/MyPostsPage";
import MySinglePost from "./pages/MyProfile/MySinglePost";
import ErrorPage from "./pages/App/ErrorPage";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import BookmarksPage from "./pages/MyProfile/BookmarksPage";
import UserProfilePage from "./pages/OthersProfile/UserProfilePage";
import UserSinglePost from "./pages/OthersProfile/UserSinglePost";
import ExplorePage from "./pages/App/ExplorePage";
import SearchPage from "./pages/App/SearchPage";
import RelationsPage from "./pages/MyProfile/RelationsPage";
import BlackListShow from "./components/RelationsLists/BlackListShow";
import FollowersListShow from "./components/RelationsLists/FollowesListShow";
import FollowingsListShow from "./components/RelationsLists/FollowingsListShow";
import CloseFriendsListShow from "./components/RelationsLists/CloseFriendsListShow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationNavLinks from "./components/Notifications/NotificationNavLinks";
import MyNotifs from "./components/Notifications/MyNotifs";
import NotificationPage from "./pages/MyProfile/NotificationsPage";
import FriendsNotifsShow from "./components/Notifications/FriendsNotifs";

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
              <Route path="notifications" element={<NotificationPage />}>
                <Route
                  index={true}
                  element={<Navigate to="my-notifs" replace={true} />}
                />
                <Route path="my-notifs" element={<MyNotifs />} />
                <Route path="other-notifs" element={<FriendsNotifsShow />} />
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
