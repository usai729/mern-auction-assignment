import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import MyProfile from "./Pages/MyProfile";
import Auth from "./Pages/Auth";
import Bid from "./Pages/Bid";
import NewProduct from "./Pages/NewProduct";
import AllProducts from "./Pages/AllProducts";
import Chat from "./Pages/Chat";
import SeachResults from "./Pages/SeachResults";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/bid/:id" element={<Bid />} />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/conversations" element={<Chat />} />
          <Route path="/search/:query" element={<SeachResults />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
