import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

//pages
import RootLayout from "./pages/RootLayout";
// import HomeLayout from "./pages/HomeLayout";

//components
// import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
// import Subscription from "./components/Subscription/Subscription";
// import Accountdetails from "./components/Accountdetails/Accountdetails";
// import Paymentfailure from "./components/Paymentfailure/Paymentfailure";
// import Paymentsuccess from "./components/Paymentsuccess/Paymentsuccess";
// import Feedback from "./components/Feedback/Feedback";
import NotFound from "./components/NotFound/NotFound";
import { NewsContextProvider } from "./context/newsContext";
import { UserContextProvider } from "./context/userContext";
import UserProtectedWrapper from "./context/UserProtectedWrapper";
import Loader from "./components/Loader/Loader";

const Login = lazy(() => import("./components/Login/Login"));
const Home = lazy(() => import("./components/Home/Home"));
const Subscription = lazy(() => import("./components/Subscription/Subscription"));
const Accountdetails = lazy(() => import("./components/Accountdetails/Accountdetails"));
const Paymentfailure = lazy(() => import("./components/Paymentfailure/Paymentfailure"));
const Paymentsuccess = lazy(() => import("./components/Paymentsuccess/Paymentsuccess"));
const Feedback = lazy(() => import("./components/Feedback/Feedback"));
const HomeLayout = lazy(() => import("./pages/HomeLayout"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={<Loader />}><UserProtectedWrapper><HomeLayout /></UserProtectedWrapper></Suspense>}>
          <Route path=":channel" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
          <Route path="account" element={<Suspense fallback={<Loader />}><Accountdetails /></Suspense>} />
          <Route path="feedback" element={<Suspense fallback={<Loader />}><Feedback /></Suspense>} />
        </Route>
        <Route path="/pricing/:id" element={<Suspense fallback={<Loader />}><UserProtectedWrapper><Subscription /></UserProtectedWrapper></Suspense>} />
        <Route path="/paymentsuccess" element={<Suspense fallback={<Loader />}><Paymentsuccess /></Suspense>} />
        <Route path="/paymentfailure" element={<Suspense fallback={<Loader />}><Paymentfailure /></Suspense>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <UserContextProvider>
    <NewsContextProvider>
      <RouterProvider router={router} />
    </NewsContextProvider>
    </UserContextProvider>
  );
}

export default App;
