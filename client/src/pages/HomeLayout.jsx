import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsPaperOptionsBar from "../components/NewsPaperOptionsBar/NewsPaperOptionsBar";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <NewsPaperOptionsBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
