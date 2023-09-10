import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";

import Things from "./components/Things";
import Register from "./components/Register/RegisterSteps";
// import PostAd from "./components/Ads/PostAd";

import PostAd from "./pages/PostAd.page";

import AdDetailsPage from "./pages/AdDetails.page";
// import CategoryList from "./components/Homepage/CategoryList";
import HomePage from "./pages/Home.page";
import GetAds from "./pages/GetAds.page";
import Protected from "./pages/Protected.page";
import Login from "./pages/Login.page";
import AdminLogin from "./pages/AdminLogin.page";
import GetNotifications from "./pages/Notification.page";
import { useSelector } from "react-redux";
import AdReview from "./components/Admin/AdReview/AdReview";
import Promotion from "./pages/Promotion.page";
import GetChats from "./pages/Chats.page";
import UserProfile from "./pages/UserProfile";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AdReviewDetails from "./components/Admin/AdReview/AdReviewDetails/AdReviewDetails";
import TransactionTable from "./components/Admin/Transaction/TransactionTable";
import UserTable from "./components/Admin/UserManagement/UserTable";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state: any) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state: any) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

const PrivateRoutesAdmin = () => {
  const { isAuth } = useSelector((state: any) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/admin/login" />}</>;
};

const RestrictedRoutesAdmin = () => {
  const { isAuth } = useSelector((state: any) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/admin" />}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/things/:id/" element={<Things />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/notifications" element={<GetNotifications />} />
            <Route path="/ads/post-ad/" element={<PostAd />} />
            <Route path="/protected/" element={<Protected />} />
            <Route path="/chat/" element={<GetChats />} />
            <Route path="/profile/" element={<UserProfile />} />
          </Route>

          <Route element={<RestrictedRoutes />}>
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
          </Route>

          <Route element={<RestrictedRoutesAdmin />}>
            <Route path="/admin/login/" element={<AdminLogin />} />
          </Route>

          <Route element={<PrivateRoutesAdmin />}>
            <Route path="/admin" element={<AdminLayout title="Admin" />}>
              <Route index element={<Navigate to={"ad_reviews"} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ad_reviews" element={<AdReview />} />
              <Route path="ad_reviews/:ad_id" element={<AdReviewDetails />} />
              <Route path="user_management" element={<UserTable />} />
              <Route path="transactions" element={<TransactionTable />} />
            </Route>
            {/* <Route path="/admin/test/*" element={<SimpleSidebar />} /> */}
          </Route>

          <Route path="/ads/" element={<GetAds />} />

          <Route path="/ads/:id/" element={<AdDetailsPage />} />
          <Route path="/ads/:id/promote" element={<Promotion />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
