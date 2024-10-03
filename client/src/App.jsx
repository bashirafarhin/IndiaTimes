import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

//pages
import RootLayout from "./pages/RootLayout";
import HomeLayout from "./pages/HomeLayout";

//components
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Subscription from "./components/Subscription/Subscription";
import Accountdetails from "./components/Accountdetails/Accountdetails";
import Paymentfailure from "./components/Paymentfailure/Paymentfailure";
import Paymentsuccess from "./components/Paymentsuccess/Paymentsuccess";
import Feedback from "./components/Feedback/Feedback";
import NotFound from "./components/NotFound/NotFound";
import { NewsContextProvider } from "./context/newsContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/home/:id" element={<HomeLayout />}>
          <Route path=":channel" element={<Home />} />
          <Route path="account" element={<Accountdetails />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="/pricing/:id" element={<Subscription />} />
        <Route path="/paymentsuccess" element={<Paymentsuccess />} />
        <Route path="/paymentfailure" element={<Paymentfailure />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <NewsContextProvider>
      <RouterProvider router={router} />
    </NewsContextProvider>
  );
}

export default App;
