import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PublicPage,
  LandingPage,
  ProductPage,
  LocalesPages,
  ContactPage,
  Login,
  Register,
} from "./pages/public";
import {
  CargoPage,
  CategoryPage,
  UserPage,
  PrivatePage,
} from "./pages/private";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/locales" element={<LocalesPages />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivatePage />}>
          <Route path="/userapp" element={<UserPage />} />
          <Route path="/productapp" element={<p>this is productapp</p>} />
          <Route path="/clientapp" element={<p>this is clientapp</p>} />
          <Route path="/categoryapp" element={<CategoryPage />} />
          <Route path="/cargosapp" element={<CargoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
