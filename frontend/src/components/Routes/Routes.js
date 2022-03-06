import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Header from "./Header";
import Footer from "./Footer";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/*" />
      </Routes>
      <Footer />
    </div>
  );
}

export default Router;
